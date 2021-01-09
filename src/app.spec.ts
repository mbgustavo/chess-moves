import app from './app';
import chai from 'chai';
import chaiHttp from 'chai-http';

import 'mocha';

chai.use(chaiHttp);

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
});

describe('Knight Possible Positions Request', () => {
  const path = '/positions';
  const pieceName = 'knight';

  it('Should return the positions for a knight in the corner on call', async () => {
    return chai
      .request(app)
      .get(`${path}/${pieceName}&A1`)
      .then(res => {
        chai.expect(res.body.data).to.have.members([
          'A2', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8', // up
          'B1', 'C1', 'D1', 'E1', 'F1', 'G1', 'H1' // right
        ]);
      });
  });

  it('Should return positions for a knight in the middle of the table', async () => {
    return chai
      .request(app)
      .get(`${path}/${pieceName}&E4`)
      .then(res => {
        chai.expect(res.body.data).to.have.members([
          'E1', 'E2', 'E3', 'E5', 'E6', 'E7', 'E8', // vertical
          'A4', 'B4', 'C4', 'D4', 'F4', 'G4', 'H4' // horizontal
        ]);
      });
  });
});

describe('Bishop Possible Positions Request', () => {
  const path = '/positions';
  const pieceName = 'bishop';

  it('Should return positions for a bishop in the middle of the table', async () => {
    return chai
      .request(app)
      .get(`${path}/${pieceName}&D4`)
      .then(res => {
        chai.expect(res.body.data).to.have.members([
          'C3', 'B2', 'A1', // down-left
          'E3', 'F2', 'G1', // down-right
          'C5', 'B6', 'A7', // up-left
          'E5', 'F6', 'G7', 'H8' // up-right
        ]);
      });
  });
});

describe('Queen Possible Positions Request', () => {
  const path = '/positions';
  const pieceName = 'queen';

  it('Should return the positions for a queen in the corner on call', async () => {
    return chai
      .request(app)
      .get(`${path}/${pieceName}&A1`)
      .then(res => {
        chai.expect(res.body.data).to.have.members([
          'A2', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8', // up
          'B1', 'C1', 'D1', 'E1', 'F1', 'G1', 'H1', // right
          'B2', 'C3', 'D4', 'E5', 'F6', 'G7', 'H8' // diagonal
        ]);
      });
  });

  it('Should return positions for a queen in the middle of the table', async () => {
    return chai
      .request(app)
      .get(`${path}/${pieceName}&E5`)
      .then(res => {
        chai.expect(res.body.data).to.have.members([
          'E1', 'E2', 'E3', 'E4', 'E6', 'E7', 'E8', // vertical
          'A5', 'B5', 'C5', 'D5', 'F5', 'G5', 'H5', // horizontal
          'A1', 'B2', 'C3', 'D4', 'F6', 'G7', 'H8', // diagonal (/)
          'B8', 'C7', 'D6', 'F4', 'G3', 'H2' // anti-diagonal (\)
        ]);
      });
  });
});

describe('King Possible Positions Request', () => {
  const path = '/positions';
  const pieceName = 'king';

  it('Should return the positions for a king in the corner on call', async () => {
    return chai
      .request(app)
      .get(`${path}/${pieceName}&H1`)
      .then(res => {
        chai.expect(res.body.data).to.have.members(['G1', 'G2', 'H2']);
      });
  });

  it('Should return positions for a king in the middle of the table', async () => {
    return chai
      .request(app)
      .get(`${path}/${pieceName}&D2`)
      .then(res => {
        chai.expect(res.body.data).to.have.members(['D3', 'E3', 'E2', 'E1', 'D1', 'C1', 'C2', 'C3']);
      });
  });
});

describe('Invalid requests', () => {
  const path = '/positions';

  it('Should return invalid piece error', async () => {
    return chai
      .request(app)
      .get(`${path}/president&D1`)
      .then(res => {
        chai.expect(res.body).to.eql({ error: 'invalid-piece' });
      });
  });

  it('Should return invalid position error (invalid row 0)', async () => {
    return chai
      .request(app)
      .get(`${path}/horse&B0`)
      .then(res => {
        chai.expect(res.body).to.eql({ error: 'invalid-position' });
      });
  });

  it('Should return invalid position error (invalid row 9)', async () => {
    return chai
      .request(app)
      .get(`${path}/knight&D9`)
      .then(res => {
        chai.expect(res.body).to.eql({ error: 'invalid-position' });
      });
  });

  it('Should return invalid position error (invalid column J)', async () => {
    return chai
      .request(app)
      .get(`${path}/queen&J6`)
      .then(res => {
        chai.expect(res.body).to.eql({ error: 'invalid-position' });
      });
  });

  it('Should return invalid position error (invalid position format)', async () => {
    return chai
      .request(app)
      .get(`${path}/king&00`)
      .then(res => {
        chai.expect(res.body).to.eql({ error: 'invalid-position' });
      });
  });
})