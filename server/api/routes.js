const { User, Hotel, Reservation } = require('../models');

module.exports = function createRoutes(app) {
  app.get('/api/user-info', (req, res) => {
    res.send(User.findById(1));
  });

  app.get('/api/hotels', (req, res) => {
    res.send({
      results: Hotel.search(req.query.q),
    });
  });

  app.get('/api/hotels/:id', (req, res) => {
    const match = Hotel.findById(+req.params.id);
    if (match) {
      res.send(match);
    } else {
      res.status(404).send(null);
    }
  });

  app.get('/api/reservations', (req, res) => {
    res.send({
      results: Reservation.filter((reservation) => reservation.userId === 1),
    });
  });

  app.post('/api/reservations', (req, res) => {
    const reservation = Reservation.create({ userId: 1, canceled: false, ...req.body, hotelId: +req.body.hotelId });
    res.status(201).send(reservation);
  });

  app.post('/api/reservations/:id/cancel', (req, res) => {
    const reservation = Reservation.updateById(req.params.id, { canceled: true });
    res.status(200).send(reservation);
  });
};
