/** source/routes/expenses.ts */
import express from 'express';
import controller from '../controllers/expenses';
const router = express.Router();

router.get('/expenses', controller.getExpenses);
router.get('/expenses/:id', controller.getExpense);
router.put('/expenses/:id', controller.updateExpense);
router.delete('/expenses/:id', controller.deleteExpense);
router.post('/expenses', controller.addExpense);

export = router;[]