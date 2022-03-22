/** source/routes/expenses.ts */
import express from 'express';
import controller from '../controllers/expenses';
const router = express.Router();
import swaggerValidation from 'openapi-validator-middleware';
swaggerValidation.init('./swagger-output.json');

router.get('/expenses', swaggerValidation.validate, controller.getExpenses);
router.get('/expenses/:id', swaggerValidation.validate, controller.getExpense);
router.put('/expenses/:id', swaggerValidation.validate, controller.updateExpense);
router.delete('/expenses/:id', swaggerValidation.validate, controller.deleteExpense);
router.post('/expenses', swaggerValidation.validate, controller.addExpense);

export = router;