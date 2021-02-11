const apiUrl = 'http://localhost:9595/api';
const request = {
  async get(path) {
    const response = await fetch(`${apiUrl}${path}`);
    return response.json();
  },
  async post(path, body) {
    const response = await fetch(`${apiUrl}${path}`, {
      method: 'POST',
      body: JSON.stringify(body),
    });
    return response.json();
  },
};

export const user = {
  state: null,
  reducers: {
    setUser(state, payload) {
      return payload;
    },
  },
  effects: () => ({
    async fetch() {
      const userData = await request.get('/user-info');
      this.setUser(userData);
    },
  }),
};

export const hotel = {
  state: {
    list: null,
    listLoading: false,
    byId: {},
    byIdLoading: false,
  },
  reducers: {
    setList(state, payload) {
      return {
        ...state,
        list: payload,
        listLoading: false,
      };
    },
    setById(state, payload) {
      return {
        ...state,
        byId: {
          ...state.byId,
          [payload.id]: payload,
        },
        byIdLoading: false,
      };
    },
    startLoading(state, payload) {
      return {
        ...state,
        [`${payload}Loading`]: true,
      };
    },
  },
  effects: () => ({
    async search(query) {
      this.startLoading('list');
      const response = await request.get(`/hotels?q=${query}`);
      this.setList(response.results);
    },
    async fetchById(id) {
      this.startLoading('byId');
      const _hotel = await request.get(`/hotels/${id}`);
      this.setById(_hotel);
    },
  }),
};

export const reservation = {
  state: {
    list: [],
    loading: false,
  },
  reducers: {
    add(state, payload) {
      return {
        ...state,
        list: [...state.list, ...payload],
        loading: false,
      };
    },
    update(state, payload) {
      return {
        ...state,
        loading: false,
        list: state.list.map((item) => {
          if (item.id !== payload.id) {
            return item;
          }

          return { ...item, ...payload };
        }),
      };
    },
    startLoading(state) {
      return {
        ...state,
        loading: true,
      };
    },
  },
  effects: () => ({
    async fetch() {
      this.startLoading();
      const response = await request.get('/reservations');
      this.add(response.results);
    },
    async create(payload) {
      this.startLoading();
      const _reservation = await request.post('/reservations', payload);
      this.add([_reservation]);
    },
    async cancel(payload) {
      this.startLoading();
      const _reservation = await request.post(`/reservations/${payload}/cancel`);
      this.update(_reservation);
    },
  }),
};
