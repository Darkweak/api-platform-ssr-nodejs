import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose, lifecycle, setStatic } from 'recompose';
import { fetchBooks } from './store/action';

export const List = compose(
  connect(
    reducers => ({
      ...reducers.BookReducer
    }),
    {
      fetchBooks
    }
  ),
  lifecycle({
    componentDidMount() {
      const { fetchBooks } = this.props;
      fetchBooks();
    }
  }),
  setStatic(
    'fetching', ({ dispatch }) => [dispatch(fetchBooks())]
  ))(({ books }) => (
    <React.Fragment>
      <h1>You are on the welcome page, <Link to="/">go to homepage</Link></h1>
      <ul>
        {
          books.map((book, index) => <li key={ index }>{ book.name }</li>)
        }
      </ul>
    </React.Fragment>
));
