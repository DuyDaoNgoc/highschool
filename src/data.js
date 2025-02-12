import React from "react";
import axios from "axios";
import UpdateForm from "./update";
import "./App.css";
import img_gif from "./img_gif.gif";
import gif from "./6oa.gif";

class Shop extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      error: null,
      isLoading: true,
      colgroup: [
        {
          width: "50%",
          style: {
            border: "1px solid #ccc",
          },
        },

        {
          width: "20%",
          style: {
            border: "1px solid #ccc",
          },
        },

        {
          width: "20%",
          style: {
            border: "1px solid #ccc",
          },
        },

        {
          width: "10%",
          style: {
            border: "1px solid #ccc",
          },
        },
      ],
      editingItem: null,
    };
  }

  deleteItem = (id) => {
    axios
      .delete(`https: //676a0b77863eaa5ac0dd3616.mockapi.io/api/v1/${id}`)

      .then(() => {
        this.setState((prevState) => ({
          data: prevState.data.filter((item) => item.id !== id),
        }));
      })
      .catch((error) => {
        this.setState({
          error: error.message,
        });
      });
  };

  updateItem = (id, updatedData) => {
    axios
      .put(
        `https: //676a0b77863eaa5ac0dd3616.mockapi.io/api/v1/wife${id}`,

        updatedData
      )
      .then(() => {
        this.setState((prevState) => ({
          data: prevState.data.map((item) =>
            item.id === id
              ? {
                  ...item,
                  ...updatedData,
                }
              : item
          ),
          editingItem: null,
        }));
      })
      .catch((error) => {
        this.setState({
          error: error.message,
        });
      });
  };

  startEditing = (item) => {
    this.setState({
      editingItem: item,
    });
  };

  cancelEditing = () => {
    this.setState({
      editingItem: null,
    });
  };

  componentDidMount() {
    axios
      .get("https://676a0b77863eaa5ac0dd3616.mockapi.io/api/v1/wife")
      .then((response) => {
        this.setState({
          data: response.data,
          isLoading: false,
        });
      })
      .catch((error) => {
        this.setState({
          error: error.message,
          isLoading: false,
        });
      });
  }

  render() {
    const { data, error, isLoading, colgroup, editingItem } = this.state;

    if (isLoading) {
      return (
        <div className="div_span_js">
          {" "}
          <div className="loading">
            {" "}
            <span>
              {" "}
              <img
                className="img_gif_span"
                src={img_gif}
                alt="GIF Animation"
              />{" "}
            </span>{" "}
            <span
              style={{
                "--i": 1,
              }}
            >
              L
            </span>{" "}
            <span
              style={{
                "--i": 2,
              }}
            >
              o
            </span>{" "}
            <span
              style={{
                "--i": 3,
              }}
            >
              a
            </span>{" "}
            <span
              style={{
                "--i": 4,
              }}
            >
              d
            </span>{" "}
            <span
              style={{
                "--i": 5,
              }}
            >
              i
            </span>{" "}
            <span
              style={{
                "--i": 6,
              }}
            >
              n
            </span>{" "}
            <span
              style={{
                "--i": 7,
              }}
            >
              g
            </span>{" "}
            <span
              style={{
                "--i": 8,
              }}
            >
              .
            </span>{" "}
            <span
              style={{
                "--i": 9,
              }}
            >
              .
            </span>{" "}
            <span
              style={{
                "--i": 10,
              }}
            >
              .
            </span>{" "}
          </div>{" "}
        </div>
      );
    }

    if (error) {
      return (
        <div className="chim_mua">
          {" "}
          <span>
            {" "}
            <img className="img_gif_span" src={gif} alt="GIF Animation" />{" "}
          </span>{" "}
          Error: {error}
        </div>
      );
    }

    return (
      <div>
        {" "}
        <h1
          style={{
            textAlign: "center",
            fontSize: "50px",
            fontFamily: "cursive",
            color: "darkorange",
          }}
        >
          {" "}
          chill duck guy{" "}
        </h1>{" "}
        <div className="display_table_js">
          {" "}
          <img className="img_gif" src={img_gif} alt="GIF Animation" />{" "}
          <table
            className="table"
            style={{
              borderCollapse: "collapse",
            }}
          >
            {" "}
            <colgroup>
              {" "}
              {colgroup.map((col, index) => (
                <col key={index} style={col.style} />
              ))}
            </colgroup>{" "}
            <thead>
              {" "}
              <tr>
                {" "}
                <th
                  style={{
                    border: "1px solid #ccc",
                    padding: "8px",
                  }}
                >
                  {" "}
                  Name{" "}
                </th>{" "}
                <th
                  style={{
                    border: "1px solid #ccc",
                    padding: "8px",
                  }}
                >
                  {" "}
                  Age{" "}
                </th>{" "}
                <th
                  style={{
                    border: "1px solid #ccc",
                    padding: "8px",
                  }}
                >
                  {" "}
                  Email{" "}
                </th>{" "}
                <th
                  style={{
                    border: "1px solid #ccc",
                    padding: "8px",
                  }}
                >
                  {" "}
                  Hobbies{" "}
                </th>{" "}
                <th
                  style={{
                    border: "1px solid #ccc",
                    padding: "8px",
                  }}
                >
                  {" "}
                  Actions{" "}
                </th>{" "}
              </tr>{" "}
            </thead>{" "}
            <tbody>
              {" "}
              {data.map((item) => (
                <tr
                  key={item.id}
                  style={{
                    border: "1px solid #ccc",
                  }}
                >
                  {" "}
                  {editingItem && editingItem.id === item.id ? (
                    <UpdateForm
                      item={item}
                      onUpdate={this.updateItem}
                      onCancel={this.cancelEditing}
                    />
                  ) : (
                    <>
                      {" "}
                      <td
                        style={{
                          border: "1px solid #ccc",
                          padding: "8px",
                        }}
                      >
                        {" "}
                        {item.name}
                      </td>{" "}
                      <td
                        style={{
                          border: "1px solid #ccc",
                          padding: "8px",
                        }}
                      >
                        {" "}
                        {item.age}
                      </td>{" "}
                      <td
                        style={{
                          border: "1px solid #ccc",
                          padding: "8px",
                        }}
                      >
                        {" "}
                        {item.email}
                      </td>{" "}
                      <td
                        style={{
                          border: "1px solid #ccc",
                          padding: "8px",
                        }}
                      >
                        {" "}
                        {item.hobbies.join(", ")}
                      </td>{" "}
                      <td
                        style={{
                          border: "1px solid #ccc",
                          padding: "8px",
                          gap: "13px",
                          display: "flex",
                        }}
                      >
                        {" "}
                        <button
                          onClick={() => this.startEditing(item)}
                          className="td_btn"
                        >
                          {" "}
                          Sửa{" "}
                        </button>{" "}
                        <button
                          onClick={() => this.deleteItem(item.id)}
                          className="td_btn"
                        >
                          {" "}
                          Xoá{" "}
                        </button>{" "}
                      </td>{" "}
                    </>
                  )}
                </tr>
              ))}
            </tbody>{" "}
          </table>{" "}
        </div>{" "}
      </div>
    );
  }
}

export default Shop;
