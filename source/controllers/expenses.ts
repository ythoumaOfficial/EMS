/** source/controllers/expenses.ts */
import { Request, Response, NextFunction } from 'express';
import { EnumType } from 'typescript';
import { collections } from "../db/database";
import { ObjectId } from "mongodb";

interface Expense {
    expenseId: Number;
    description: String;
    value: Number;
    type: EnumType;
}

// getting all expenses
const getExpenses = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // get some expenses
        const expenses = await collections.expenses?.find<Expense>({}).toArray();
        return res.status(200).json({
            //TODO: list of type Expense
            expenses: expenses
        });
    } catch (error: any) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
};

// getting a single expense
const getExpense = async (req: Request, res: Response, next: NextFunction) => {
     // #swagger.parameters['id'] = { description: 'ID of Expense' }
    try {
        // get the expense id from the req
        let id: string = req.params.id;
        const query = { _id: new ObjectId(id) };
        const expense = await collections.expenses?.findOne<Expense>(query);
        // get the expense
        return res.status(200).json({
            //TODO: object of type Expense
            message: expense
        });
    } catch (error: any) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
};

// updating a expense
const updateExpense = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // get the expense id from the req.params
        const query = { _id: new ObjectId(req.params.id) };
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
    try {
        // get the expense id from req.params
        let id: string = req.params.id;
        // delete the expense
        const query = { _id: new ObjectId(id) };
        const result = await collections.expenses?.deleteOne(query);

        if (result && result.deletedCount) {
            res.status(202).send(`Successfully removed expense with id ${id}`);
        } else if (!result) {
            res.status(400).send(`Failed to remove expense with id ${id}`);
        } else if (!result.deletedCount) {
            res.status(404).send(`Expense with id ${id} does not exist`);
        }
        // return response
        return res.status(200).json({
            message: 'expense deleted successfully'
        });
    } catch (error: any) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
};

// adding a expense
const addExpense = async (req: Request, res: Response, next: NextFunction) => {
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
        console.error(error.message);
        res.status(400).send(error.message);
    }
};

export default { getExpenses, getExpense, updateExpense, deleteExpense, addExpense };