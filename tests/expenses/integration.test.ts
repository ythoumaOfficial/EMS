
import supertest from 'supertest';
import app from '../../source/server';

const addHeaders = (request: any) => {
    return request.set('Content-Type', 'application/json').timeout(2000);
}
const request = supertest(app);

const endpoint = '/expenses';
describe('Expenses CRUD', () => {
    let newID: String;
    beforeEach(async () => {
        const response = await addHeaders(request.post(endpoint)).send(
            {
                "description": "From Integration",
                "value": 11500,
                "type": "Entertainment"
            }
        );
        newID = response.body.message.insertedId;
    });
    it('Should send data when body is sent', async () => {
        const response = await addHeaders(request.post(endpoint)).send(
            {
                "description": "From Integration test",
                "value": 11500,
                "type": "Entertainment"
            }
        );
        expect(response.status).toBe(200);
        expect(response.body).toBeDefined();
        expect(response.body.message).toBeDefined();
        expect(response.body.message.insertedId).toBeDefined();
    });
    it('Should send data when Expense exists for id', async () => {
        const response = await addHeaders(request.get(endpoint + '/' + newID));
        expect(response.status).toBe(200);
        expect(response.body).toBeDefined();
        expect(response.body).toHaveProperty('_id');
    });
    it('Should send data when Expense exists for id', async () => {
        const response = await addHeaders(request.put(endpoint + '/' + newID).send(
            {
                "description": "From Integration after Update",
                "value": 1200,
                "type": "Entertainment"
            }
        ));
        expect(response.status).toBe(200);
        expect(response.body).toBeDefined();
        expect(response.body).toHaveProperty('message');
        expect(response.body.message).toMatch(/Successfully updated expense with id/);
    });

    it('Should send data when Expense exists for id', async () => {
        const response = await addHeaders(request.delete(endpoint + '/' + newID));
        expect(response.status).toBe(202);
        expect(response.body).toBeDefined();
        expect(response.body).toHaveProperty('message');
        expect(response.body.message).toMatch(/Successfully removed expense with id/);
    });
});