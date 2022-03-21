/** source/controllers/expenses.ts */
import { Request, Response, NextFunction } from 'express';
import { EnumType } from 'typescript';
interface Expense {
    expenseId: Number;
    description: String;
    value: Number;
    type: EnumType;
}

// getting all expenses
const getExpenses = async (req: Request, res: Response, next: NextFunction) => {
    // get some expenses
    return res.status(200).json({
        //TODO: list of type Expense
        message: []
    });
};

// getting a single expense
const getExpense = async (req: Request, res: Response, next: NextFunction) => {
    // get the expense id from the req
    let id: string = req.params.id;
    // get the expense
    return res.status(200).json({
        //TODO: object of type Expense
        message: {}
    });
};

// updating a expense
const updateExpense = async (req: Request, res: Response, next: NextFunction) => {
    // get the expense id from the req.params
    let id: string = req.params.id;
    // get the data from req.body
    let title: string = req.body.title ?? null;
    let body: string = req.body.body ?? null;
    // update the expense
    // return response
    return res.status(200).json({
        message: {}
    });
};

// deleting a expense
const deleteExpense = async (req: Request, res: Response, next: NextFunction) => {
    // get the expense id from req.params
    let id: string = req.params.id;
    // delete the expense

    // return response
    return res.status(200).json({
        message: 'expense deleted successfully'
    });
};

// adding a expense
const addExpense = async (req: Request, res: Response, next: NextFunction) => {
    // get the data from req.body
    let title: string = req.body.title;
    let body: string = req.body.body;
    // add the expense

    // return response
    return res.status(200).json({
        message: {}
    });
};

export default { getExpenses, getExpense, updateExpense, deleteExpense, addExpense };