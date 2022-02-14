const request = require('supertest');
const app = require('./app');

describe('api/v1/stations endpoint', () => {
  it('with at query param returns stations data', () => {
    return request(app)
      .get('/api/v1/stations')
      .query({ at: '2017-11-01T11:00:00' })
      .expect('content-type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            at: expect.any(String),
            stations: expect.any(Array),
            weather: expect.any(Object),
          })
        );
      });
  });

  it("with at query params thats ahead of our history should return 404", () => {
    return request(app)
      .get('/api/v1/stations')
      .query({ at: '2023-11-01T11:00:00' })
      .expect(404)
  })

  it('with wrong at query param returns 500', () => {
    return request(app).get('/api/v1/stations').query({ at: 'adsada' }).expect('content-type', /json/).expect(500);
  });

  it('without at query param returns validation error', () => {
    return request(app)
      .get('/api/v1/stations')
      .expect('content-type', /json/)
      .expect(400)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            at: expect.any(Array),
          })
        );
      });
  });
});

describe('api/v1/stations/{id} with at param', () => {
  it('without params returns 404', () => {
    return request(app)
      .get('/api/v1/stations/3010')
      .expect(404)
  });

  it('with correct at param returns at, station and weather data', () => {
    return request(app)
      .get('/api/v1/stations/3010')
      .query({ at: '2017-11-01T11:00:00'})
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            at: expect.any(String),
            station: expect.any(Object),
            weather: expect.any(Object),
          })
        );
      });
  })

  if("with at query params thats ahead of our history should return 404", () => {
    return request(app)
      .get('/api/v1/stations/3010')
      .query({ at: '2023-11-01T11:00:00' })
      .expect(404)
  })

  it('with wrong at query param returns 500', () => {
    return request(app).get('/api/v1/stations/3010').query({ at: 'adsada' }).expect('content-type', /json/).expect(500);
  });
})


describe('api/v1/stations/{id} with from and to params', () => {
  it('without params returns 404', () => {
    return request(app)
      .get('/api/v1/stations/3010')
      .expect(404)
  });

  it('with correct params returns an array of {at, station and weather} data', () => {
    return request(app)
      .get('/api/v1/stations/3010')
      .query({ from: '2017-11-01T11:00:00', to: '2023-11-01T11:00:00'})
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual(expect.arrayContaining([
          expect.objectContaining({
            at: expect.any(String),
            station: expect.any(Object),
            weather: expect.any(Object),
          })
        ]));
      });
  })

  if("with at query params thats ahead of our history should return 404", () => {
    return request(app)
      .get('/api/v1/stations/3010')
      .query({ from: '2022-11-01T11:00:00', to: '2023-11-01T11:00:00'})
      .expect(404)
  })

  it('with wrong at query param returns 500', () => {
    return request(app).get('/api/v1/stations/3010').query({ from: 'sa', to: '2023-11-01T11:00:00'}).expect('content-type', /json/).expect(500);
  });
})