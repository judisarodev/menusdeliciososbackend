const request = require('supertest');
const express = require('express');
const app = express();

app.get('/hello', (req, res) => {
    return res.status(200).json({ name: 'Juan' });
});

const api = request(app);

describe('Hello endpoint testing', () => {
    test('GET / HELLO', async () => {
        const response = await api.get('/hello');
        expect(response.body).toEqual({ name: 'Juan' });
    });
});