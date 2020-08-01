import app from './app';
import chai from 'chai';
import chaiHttp from 'chai-http';

import 'mocha';

chai.use(chaiHttp);
const expect = chai.expect;

describe('Horse Possible Positions Request', () => {
  const path = '/positions';
  const pieceName = 'horse';

  it('Should return 3 positions for a horse near the corner on call', async () => {
    return chai
      .request(app)
      .get(`${path}/${pieceName}&B1`)
      .then(res => {
        chai.expect(res.body.data).to.have.members(['A3', 'C3', 'D2']);
      });
  });

  it('Should return 8 positions for a horse in the middle of the table', async () => {
    return chai
      .request(app)
      .get(`${path}/${pieceName}&D5`)
      .then(res => {
        chai.expect(res.body.data).to.have.members(['C7', 'B6', 'B4', 'C3', 'E7', 'F6', 'F4', 'E3']);
      });
  });

  it('Should return invalid position error', async () => {
    return chai
      .request(app)
      .get(`${path}/${pieceName}&D0`)
      .then(res => {
        chai.expect(res.body).to.eql({ error: 'invalid-position' });
      });
  });

  it('Should return invalid piece error', async () => {
    return chai
      .request(app)
      .get(`${path}/horser&B1`)
      .then(res => {
        chai.expect(res.body).to.eql({ error: 'invalid-piece' });
      });
  });
});