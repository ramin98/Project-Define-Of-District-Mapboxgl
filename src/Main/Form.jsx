import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFormSettings } from "../store/fetchs";
import { addCards } from "../store/reducer";
import deleteImg from "../images/delete.png";
import redactImg from "../images/redact.png";

import Map from "./Map";
import ColorModal from "./ColorModal";

function Form() {
  let dispatch = useDispatch();
  const [redact, setRedact] = useState(false);
  const [color, setColor] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const [redactValue, setRedactValue] = useState({ color: "", answer: "" });
  const [redactingElement, setRedactingElement] = useState({});
  const colors = [
    "#FF0000",
    "#0000FF",
    "#008000",
    "#FFFF00",
    "#FFA500",
    "#800080",
    "#00FFFF",
    "#FFFFFF",
    "#000000",
    "#FFC0CB",
  ];

  useEffect(() => {
    dispatch(fetchFormSettings());
  }, [dispatch]);

  let formSettings = useSelector((state) => state.objects.formSettings);

  const [formData, setFormData] = useState({
    answers: [],
    id: 1,
    img: "https://i.ibb.co/Q8Mwpvr/animg3.png",
  });
  const [answers, setAnswers] = useState({ id: 1, color: "", answer: "" });

  const handleChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormData({ ...formData, id: formData.id + 1 });
    dispatch(addCards(formData));
    console.log(formData);
  };

  const deleteAnswer = (id) => {
    let newArr = [...formData.answers];
    newArr = formData.answers.filter((item) => item.id !== id);
    setFormData({...formData, answers: newArr});
  };

  return (
    <div className="form">
      <div className="form-container">
        <h3>{formSettings.title}</h3>
        <form onSubmit={handleSubmit}>
          {formSettings.fields &&
            formSettings.fields.map((field) => {
              switch (field.type) {
                case "input-text":
                  return (
                    <div key={field.field}>
                      <label htmlFor="label">{field.label}:</label>
                      <input
                        id="label"
                        type="text"
                        placeholder={field.placeholder}
                        required={field.required}
                        onChange={(e) =>
                          handleChange(field.field, e.target.value)
                        }
                      />
                    </div>
                  );
                case "textarea":
                  return (
                    <div key={field.field}>
                      <label htmlFor="label2">{field.label}:</label>
                      <textarea
                        id="label2"
                        placeholder={field.placeholder}
                        required={field.required}
                        onChange={(e) =>
                          handleChange(field.field, e.target.value)
                        }
                      />
                    </div>
                  );
                case "select":
                  return (
                    <div key={field.field}>
                      <label htmlFor="label2">{field.label}:</label>
                      <select
                        required={field.required}
                        onChange={(e) =>
                          handleChange(field.field, e.target.value)
                        }
                      >
                        <option value="">Choose</option>
                        {field.data.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  );
                case "SpecialComponent1":
                  return (
                    <div key={field.field}>
                      <p>{field.label}:</p>
                      <div className="adding-answer">
                        <input
                          style={{ width: "50%" }}
                          type="text"
                          onChange={(e) =>
                            setAnswers((a) => ({
                              ...a,
                              answer: e.target.value,
                            }))
                          }
                          required
                        />
                        <label onClick={() => setModalVisible(true)}>
                          Choose
                        </label>
                        <button
                          onClick={() => {
                            console.log(answers.color, answers.answer);
                            if (color === "" || answers.answer === "") {
                              alert("Saheleri doldurun");
                              return;
                            }
                            const newAnswer = {
                              ...answers,
                              color: color,
                              id: answers.id + 1,
                            };

                            let newAnswers = [...formData.answers];
                            newAnswers.push(newAnswer);
                            setFormData({ ...formData, answers: newAnswers });
                            setColor("");
                          }}
                        >
                          ADD
                        </button>
                      </div>
                    </div>
                  );
                default:
                  return null;
              }
            })}

          <div className="answers">
            <div className="answear-heads">
              <p style={{ width: "30%" }}>Color</p>
              <p style={{ width: "50%" }}>Answers</p>
              <p style={{ width: "20%" }}>Operations</p>
            </div>
            {formData.answers.map((item, index) => {
              return (
                <div key={index} className="answers-info">
                  <p style={{ width: "30%" }}>
                    <span style={{ backgroundColor: item.color }}>
                      {item.color}
                    </span>
                  </p>
                  <p style={{ width: "50%" }}>{item.answer}</p>
                  <div style={{ width: "20%" }}>
                    <button
                      onClick={() => {
                        setRedact(true);
                        setRedactingElement(item);
                      }}
                    >
                      <img src={redactImg} alt="redactImg" />
                    </button>
                    <button type="button" onClick={() => deleteAnswer(item.id)}>
                      <img src={deleteImg} alt="delete" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
          <button
            type="submit"
            style={{
              backgroundColor: "white",
              borderRadius: "10px",
              border: "none",
              padding: "5px 25px",
              width: "fit-content",
              alignSelf: "flex-end",
            }}
          >
            Save
          </button>
        </form>
      </div>
      <Map />
      <div
        style={{ display: `${redact ? "flex" : "none"}` }}
        className="redact-modal"
      >
        <form>
          <div className="adding-answer">
            <input
              style={{ width: "50%" }}
              type="text"
              onChange={(e) => {
                setRedactValue({ ...redactValue, answer: e.target.value });
                console.log(redactValue);
              }}
              required
            />
            <label onClick={() => setModalVisible(true)}>Choose</label>
            <button
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                if (color === "" || redactValue.answer === "") {
                  alert("Saheleri doldurun");
                  return;
                }
                let newArr = [...formData.answers];
                let redactIndex = newArr.indexOf(redactingElement);
                let updatedRedact = {
                  ...newArr[redactIndex],
                  answer: redactValue.answer,
                  color: color,
                };
                newArr[redactIndex] = updatedRedact;

                let newFormData = { ...formData, answers: newArr };
                setFormData(newFormData);
                setRedact(false);
                setColor("");
              }}
            >
              ADD
            </button>
          </div>
          <button
            onClick={() => {
              setRedact(false);
            }}
          >
            CANCEL
          </button>
        </form>
      </div>
      {modalVisible && (
        <ColorModal
          colors={colors}
          setModalVisible={setModalVisible}
          setColor={setColor}
        />
      )}
    </div>
  );
}

export default Form;
