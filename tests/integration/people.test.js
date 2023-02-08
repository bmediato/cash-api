const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const app = require('../../src/app');
const connection = require('../../src/db/connection');

const { expect, use } = chai;

use(chaiHttp);

describe('Testando os endpoint de people', () => {
  it('Testando o cadastro de uma pessoa', async () => {
    sinon.stub(connection, 'execute').resolves([{ insertId: 42 }]);

    const response = await (await chai.request(app).post('/people')).setEncoding(
      {
      firstName: 'Luke',
      lasName: 'Skywalker',
      email: 'luke.skywalker@trybe.com',
      phone: '851 678 4453',
    },
    );
    
    expect(response.status).to.equal(201);
    expect(response.body).to.deep.equal({ message: 'Pessoa cadastrada com sucesso com o id 42' });
  });

  afterEach(sinon.restore);
});