import React from 'react';

function ContentsPage() {
  return (
    <div style={pageWrapper}>
      <div style={formCard}>
        <h2 style={{ marginBottom: '5px' }}>Add Content</h2>
        <hr style={dividerStyle} />

        <form style={formStyle}>
          {renderRow('Select Section', (
            <select style={inputStyle}>
              <option>1122333333333333333333333333333</option>
              <option>12324</option>
              <option>asd</option>
              <option>Expense Type</option>
              <option>Maps Roles</option>
              <option>Order Status</option>
              <option>Outlet Locations</option>
              <option>Type of Food</option>
              <option>types of any foods</option>
              <option>User Roles</option>
            </select>
          ))}

          {renderRow('Content Title', <input type="text" style={inputStyle} />)}
          {renderRow('Content Charges/Price/Cost', <input type="text" style={inputStyle} />)}
          {renderRow('Content Sequence', <input type="text" style={inputStyle} />)}
          {renderRow('Content Img Alt Tag', <input type="text" style={inputStyle} />)}
          {renderRow('Content Description', <textarea rows="3" style={inputStyle}></textarea>)}
          {renderRow('Date', <input type="date" style={inputStyle} />)}
          {renderRow('Location', <input type="text" style={inputStyle} />)}
          {renderRow('Add Link', <input type="text" style={inputStyle} />)}
          {renderRow('Image', <input type="file" style={fileInputStyle} />)}

          {/* Submit Button with line below */}
          <div>
            <div style={{ textAlign: 'left', marginTop: '10px' }}>
              <button type="submit" style={submitStyle}>SUBMIT</button>
            </div>
            <hr style={dividerStyle} />
          </div>
        </form>
      </div>
    </div>
  );
}

// Renders each label/input row
function renderRow(label, inputElement) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
      <label style={{ width: '180px', fontSize: '14px' }}>{label}</label>
      <div style={{ flex: 1 }}>{inputElement}</div>
    </div>
  );
}

// Styles
const pageWrapper = {
  backgroundColor: '#f3f3f3',
  minHeight: '100vh',
  padding: '40px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'flex-start'
};

const formCard = {
  backgroundColor: '#fff',
  padding: '30px 40px',
  borderRadius: '6px',
  boxShadow: '0px 2px 8px rgba(0,0,0,0.1)',
  width: '700px'
};

const formStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '15px'
};

const inputStyle = {
  width: '100%',
  padding: '8px',
  fontSize: '14px',
  border: '1px solid #ccc',
  borderRadius: '4px'
};

const fileInputStyle = {
  border: '1px solid #ccc',
  padding: '6px',
  borderRadius: '4px',
  fontSize: '14px'
};

const submitStyle = {
  padding: '10px',
  backgroundColor: '#e95f1d',
  color: '#fff',
  border: 'none',
  borderRadius: '4px',
  fontWeight: 'bold',
  cursor: 'pointer',
  width: '120px'
};

const dividerStyle = {
  border: 'none',
  height: '1px',
  backgroundColor: '#ccc',
  marginTop: '15px',
  marginBottom: '10px'
};

export default ContentsPage;
