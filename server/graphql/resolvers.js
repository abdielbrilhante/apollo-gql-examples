const { User, Hotel, Reservation } = require('../models');

module.exports = {
  Query: {
    userInfo() {
      return User.findById(1);
    },
    hotels(parent, args) {
      return Hotel.search(args.search);
    },
    hotel(parent, args) {
      return Hotel.findById(+args.id);
    },
    reservations() {
      return Reservation.filter((reservation) => reservation.userId === 1);
    },
  },
  Mutation: {
    placeReservation(parennt, args) {
      return Reservation.create({ userId: 1, canceled: false, ...args, hotelId: +args.hotelId });
    },
    cancelReservation(parent, args) {
      const reservation = Reservation.updateById(+args.id, { canceled: true });
      return reservation;
    },
  },
};
