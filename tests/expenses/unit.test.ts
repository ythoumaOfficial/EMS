
import supertest from 'supertest';
import app from '../../source/server';

const addHeaders = (request: any) => {
    return request.set('Content-Type', 'application/json').timeout(2000);
}
const request = supertest(app);
const endpoint = '/expenses';

describe('Get Expenses', () => {
    it('Should send error when url endpoint is more that 200 chars', async () => {
        const param = new Array(201).fill('a').join('');
        const response = await addHeaders(request.get(endpoint).query({ endpoint: param }));
        expect(response.status).toBe(400);
    });

    it('Should send data when Expense exists for url', async () => {
        const response = await addHeaders(request.get(endpoint));
        expect(response.status).toBe(200);
    });
});

describe('Get Expense by id.', () => {
    it('Should send error when invalid id is passed', async () => {
        const response = await addHeaders(request.get(endpoint + '/123'));
        expect(response.status).toBe(400);
        expect(response.body.message).toMatch(/is Invalid id./);
    });

    it('Should send error when invalid id is passed', async () => {
        const response = await addHeaders(request.get(endpoint + '/xyu'));
        expect(response.status).toBe(400);
        expect(response.body.message).toMatch(/is Invalid id./);
    });

    it('Should send error when Expense do not exists for id', async () => {
        const response = await addHeaders(request.get(endpoint+'/6239c6d82091c187cc64f989'));
        expect(response.status).toBe(404);
        expect(response.body.message).toMatch(/does not exist/);
    });

    it('Should send data when Expense exists for id', async () => {
        const response = await addHeaders(request.get(endpoint+'/6239c6d82091c187cc64f981'));
        expect(response.status).toBe(200);
        expect(response.body).toBeDefined();
        expect(response.body).toHaveProperty('_id');
    });
});

describe('Get Expense by id.', () => {
    it('Should send error when invalid id is passed', async () => {
        const response = await addHeaders(request.get(endpoint + '/123'));
        expect(response.status).toBe(400);
        expect(response.body.message).toMatch(/is Invalid id./);
    });

    it('Should send error when invalid id is passed', async () => {
        const response = await addHeaders(request.get(endpoint + '/xyu'));
        expect(response.status).toBe(400);
        expect(response.body.message).toMatch(/is Invalid id./);
    });

    it('Should send error when Expense do not exists for id', async () => {
        const response = await addHeaders(request.get(endpoint+'/6239c6d82091c187cc64f989'));
        expect(response.status).toBe(404);
        expect(response.body.message).toMatch(/does not exist/);
    });

    it('Should send data when Expense exists for id', async () => {
        const response = await addHeaders(request.get(endpoint+'/6239c6d82091c187cc64f981'));
        expect(response.status).toBe(200);
        expect(response.body).toBeDefined();
        expect(response.body).toHaveProperty('_id');
    });
});

describe('Add New Expense.', () => {
    it('Should send error when empty body is sent', async () => {
        const response = await addHeaders(request.post(endpoint));
        expect(response.status).toBe(400);
        expect(response.body).toBeDefined();
      });
});