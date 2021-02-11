const db = require('./db.json');

class Model {
  static findById(id) {
    return db[this.entity].find((item) => +item.id === +id);
  }

  static all() {
    return db[this.entity];
  }

  static filter(test) {
    return this.all().filter(test);
  }

  static create(data) {
    const item = { id: db[this.entity].length + 1, ...data };
    db[this.entity].push(item);
    return item;
  }

  static updateById(id, data) {
    const item = this.findById(id);
    Object.assign(item, data);
    return item;
  }
}

class User extends Model {
  static get entity() {
    return 'users';
  }
}

class Hotel extends Model {
  static get entity() {
    return 'hotels';
  }

  static withReviews(hotel) {
    if (!hotel) {
      return null;
    }

    const reviews = Review.filter((review) => +review.hotelId === +hotel.id);
    hotel.reviews = reviews.map(Review.withUser);
    hotel.averageRating = reviews.length
      ? (reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length)
      : null;

    return hotel;
  }

  static findById(id) {
    return Hotel.withReviews(super.findById(id));
  }

  static filter(test) {
    return super.filter(test).map(Hotel.withReviews);
  }

  static search(_query) {
    if (!_query) {
      throw new Error('Hotel.search requires a valid string');
    }

    const query = String(_query).toLowerCase();
    return this.filter((hotel) => {
      return hotel.name.toLowerCase().includes(query)
        || hotel.address.toLowerCase().includes(query)
        || hotel.state.toLowerCase().includes(query)
        || hotel.city.toLowerCase().includes(query)
        || hotel.zipcode.toLowerCase().includes(query);
    });
  }
}

class Reservation extends Model {
  static get entity() {
    return 'reservations';
  }

  static withHotel(reservation) {
    reservation.hotel = Hotel.findById(reservation.hotelId);
    return reservation;
  }

  static filter(test) {
    return super.filter(test).map(this.withHotel);
  }
}

class Review extends Model {
  static get entity() {
    return 'reviews';
  }

  static withUser(review) {
    review.user = User.findById(review.userId);
    return review;
  }
}

module.exports = { User, Hotel, Reservation, Review };
