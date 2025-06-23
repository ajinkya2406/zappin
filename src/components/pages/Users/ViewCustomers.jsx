import React from 'react';
import './ViewCustomers.css';

const customers = [
  { fullname: '', mobile: '808761168', email: '' },
  { fullname: '', mobile: '9529884435', email: '' },
  { fullname: '', mobile: '8484812694', email: '' },
  { fullname: '', mobile: '961147091', email: '' },
  { fullname: '', mobile: '80876 1167', email: '' },
  { fullname: '', mobile: '7558455608', email: '' },
  { fullname: '', mobile: '9975771409', email: '' },
  { fullname: '', mobile: '808761678', email: '' },
  { fullname: '', mobile: '8087611611', email: '' },
  { fullname: '', mobile: '808761167', email: '' },
];

const ViewCustomers = () => {
  return (
    <div className="view-customers-container">
      <h2 className="heading">List Of Customer</h2>
      <div className="table-controls">
        <label>
          Show
          <select className="entries-select">
            <option>10</option>
            <option>25</option>
            <option>50</option>
          </select>
          entries
        </label>
        <label className="search-box">
          Search:
          <input type="text" />
        </label>
      </div>

      <table className="customers-table">
        <thead>
          <tr>
            <th>Fullname</th>
            <th>Mobile</th>
            <th>Email</th>
            <th>View</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((c, index) => (
            <tr key={index}>
              <td>{c.fullname}</td>
              <td>{c.mobile}</td>
              <td>{c.email}</td>
              <td><button className="btn-view">View</button></td>
              <td><button className="btn-delete">Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination-info">
        Showing 1 to 10 of 56 entries
      </div>

      <div className="pagination">
        <button>Previous</button>
        {[1, 2, 3, 4, 5, 6].map(page => (
          <button key={page}>{page}</button>
        ))}
        <button>Next</button>
      </div>
    </div>
  );
};

export default ViewCustomers;
