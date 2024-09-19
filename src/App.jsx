import { useEffect, useState } from "react";

function App() {
  const [student, setStudent] = useState({});
  const [list, setList] = useState([]);
  const [index, setIndex] = useState(-1);
  const [errors, setErrors] = useState({}); // Store errors for each field

  const handleChange = (e) => {
    e.target.style.fontSize = "30px";
    e.target.style.color = "red";
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setStudent({ ...student, [name]: value });
  };

  const validate = () => {
    let tempErrors = {};
    const requiredFields = ["id", "name", "email", "password", "gender", "address", "city"];

    requiredFields.forEach((field) => {
      if (!student[field] || student[field].trim() === "") {
        tempErrors[field] = `${field} field is empty`;
      }
    });

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0; // Return true if no errors
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return; // If validation fails, do not proceed

    let newList;
    if (index !== -1) {
      list[index] = student;
      newList = [...list];
      setIndex(-1);
    } else {
      newList = [...list, student];
    }
    setList(newList);
    sessionStorage.setItem("studentList", JSON.stringify(newList));
    setStudent({});
    setErrors({}); // Clear errors after submission
  };

  useEffect(() => {
    const oldData = JSON.parse(sessionStorage.getItem("studentList")) || [];
    setList(oldData);
  }, []);

  const deleteData = (pos) => {
    const oldData = JSON.parse(sessionStorage.getItem("studentList")) || [];
    oldData.splice(pos, 1);
    sessionStorage.setItem("studentList", JSON.stringify(oldData));
    setList(oldData);
  };

  const editData = (pos) => {
    const editStud = list[pos];
    setStudent(editStud);
    setIndex(pos);
  };

  return (
    <>
      <h2 style={{ textAlign: "center" }} onClick={handleChange}>
        Student Registration
      </h2>
      <form method="post" onSubmit={handleSubmit}>
        <table border={1} align="center">
          <tbody>
            {["id", "name", "email", "password"].map((field) => (
              <tr key={field}>
                <td>{field.charAt(0).toUpperCase() + field.slice(1)}</td>
                <td>
                  <input
                    type="text"
                    name={field}
                    value={student[field] || ""}
                    onChange={handleInput}
                  />
                  <span style={{ color: "red" }}>{errors[field]}</span>
                </td>
              </tr>
            ))}

            <tr>
              <td>Gender</td>
              <td>
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  checked={student.gender === "male"}
                  onChange={handleInput}
                />
                Male
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={student.gender === "female"}
                  onChange={handleInput}
                />
                Female
                <span style={{ color: "red" }}>{errors.gender}</span>
              </td>
            </tr>

            <tr>
              <td>Address</td>
              <td>
                <textarea
                  rows={3}
                  cols={20}
                  name="address"
                  value={student.address || ""}
                  onChange={handleInput}
                ></textarea>
                <span style={{ color: "red" }}>{errors.address}</span>
              </td>
            </tr>

            <tr>
              <td>City</td>
              <td>
                <select
                  name="city"
                  value={student.city || ""}
                  onChange={handleInput}
                >
                  <option value="">Select city</option>
                  <option value="surat">Surat</option>
                  <option value="vapi">Vapi</option>
                  <option value="baroda">Baroda</option>
                </select>
                <span style={{ color: "red" }}>{errors.city}</span>
              </td>
            </tr>

            <tr>
              <td>Submit</td>
              <td>
                <input
                  type="submit"
                  value={index !== -1 ? "Edit Data" : "Add Data"}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </form>
      <br />
      <br />

      <table align="center" border={1}>
        <tbody>
          <tr>
            <td>Name</td>
            <td>Email</td>
            <td>Password</td>
            <td>Gender</td>
            <td>Address</td>
            <td>City</td>
            <td>Action</td>
          </tr>
          {list.map((v, i) => (
            <tr key={i}>
              <td>{v.name}</td>
              <td>{v.email}</td>
              <td>{v.password}</td>
              <td>{v.gender}</td>
              <td>{v.address}</td>
              <td>{v.city}</td>
              <td>
                <button onClick={() => deleteData(i)}>Delete</button>
              </td>
              <td>
                <button onClick={() => editData(i)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default App;
