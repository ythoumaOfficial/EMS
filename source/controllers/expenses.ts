/** source/controllers/expenses.ts */
import { Request, Response, NextFunction } from 'express';
import { collections } from "../db/database";
import { ObjectId } from "mongodb";

interface Expense {
    expenseId: Number;
    description: String;
    value: Number;
    type: String;
}

// getting all expenses
const getExpenses = async (req: Request, res: Response, next: NextFunction) => {
    // #swagger.method = 'get'
    // #swagger.tags = ['Expense']
    // #swagger.description = 'get all Expenses.'
    // #swagger.produces = ["application/json"]
    try {
        // get some expenses
        const expenses = await collections.expenses?.find<Expense>({}).toArray();
        return res.status(200).json({
            expenses: expenses
        });
    } catch (error: any) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
};

// getting a single expense
const getExpense = async (req: Request, res: Response, next: NextFunction) => {
    // #swagger.method = 'get'
    // #swagger.tags = ['Expense']
    // #swagger.description = 'Get Expense by id.'
    // #swagger.parameters['id'] = { description: 'ID of Expense' }
    // #swagger.produces = ["application/json"]
    try {
        // get the expense id from the req
        let id: string = req.params.id;
        let expenseId: ObjectId;
        try {
            expenseId = new ObjectId(id);
        } catch (error: any) {
            return res.status(400).send(`${id} is Invalid id.`);
        }
        const query = { _id: expenseId };
        const expense = await collections.expenses?.findOne<Expense>(query);
        // get the expense
        return res.status(200).json({
            message: expense
        });
    } catch (error: any) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
};

// updating a expense
const updateExpense = async (req: Request, res: Response, next: NextFunction) => {
    // #swagger.method = 'put'
    // #swagger.tags = ['Expense']
    // #swagger.description = 'Get Expense by id.'
    // #swagger.parameters['id'] = { description: 'ID of Expense' }
    // #swagger.produces = ["application/json"]
    /* #swagger.parameters['obj'] = { 
       in: 'body',
       description: 'Object of type Expense',
       schema: { $ref: "#/definitions/Expense" }
        } */
    try {
        // get the expense id from the req.params
        let expenseId: ObjectId;
        try {
            expenseId = new ObjectId(req.params.id);
        } catch (error: any) {
            return res.status(400).send(`${req.params.id} is Invalid id.`);
        }
        const query = { _id: expenseId };
        // get the data from req.body
        const updatedExpense: Expense = req.body as Expense;
        // update the expense
        const result = await collections.expenses?.updateOne(query, { $set: updatedExpense });
        // return response
        return result ? res.status(200).send(`Successfully updated expense with id ${req.params.id}`)
            : res.status(304).send(`Expense with id: ${req.params.id} not updated`);
    } catch (error: any) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
};

// deleting a expense
const deleteExpense = async (req: Request, res: Response, next: NextFunction) => {
    // #swagger.method = 'delete'
    // #swagger.tags = ['Expense']
    // #swagger.description = 'Delete Expense by id.'
    // #swagger.produces = ["application/json"]
    try {
        // get the expense id from req.params
        let id: string = req.params.id;
        // delete the expense
        let expenseId: ObjectId;
        try {
            expenseId = new ObjectId(id);
        } catch (error: any) {
            return res.status(400).send(`${id} is Invalid id.`);
        }

        const query = { _id: expenseId };
        const result = await collections.expenses?.deleteOne(query);

        if (result && result.deletedCount) {
            return res.status(202).send(`Successfully removed expense with id ${id}`);
        } else if (!result) {
            return res.status(400).send(`Failed to remove expense with id ${id}`);
        } else if (!result.deletedCount) {
            return res.status(404).send(`Expense with id ${id} does not exist`);
        }
        // return response
        return res.status(200).json({
            message: 'expense deleted successfully'
        });
    } catch (error: any) {
        res.status(400).send(error.message);
    }
};

// adding a expense
const addExpense = async (req: Request, res: Response, next: NextFunction) => {
    // #swagger.method = 'post'
    // #swagger.tags = ['Expense']
    // #swagger.description = 'Add new Expense.'
    // #swagger.produces = ["application/json"]
    /* #swagger.parameters['obj'] = { 
       in: 'body',
       description: 'Object of type Expense',
       schema: { $ref: "#/definitions/Expense" }
        } */
    try {
        // get the data from req.body
        const newExpense = req.body as Expense;
        // add the expense
        const result = await collections.expenses?.insertOne(newExpense);
        // return response
        return res.status(200).json({
            message: result
        });
    } catch (error: any) {
        res.status(400).send(error.message);
    }
};

export default { getExpenses, getExpense, updateExpense, deleteExpense, addExpense };