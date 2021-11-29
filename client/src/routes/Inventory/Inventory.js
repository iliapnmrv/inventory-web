import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";
import "./Inventory.css";
import useFetch from "../../hooks/useFetch";
import useNotification from "../../hooks/useNotification";
import Loading from "../../components/Loading/Loading";

export default function Inventory() {
  const [open, setOpen] = useState(false);

  const { data, isPending } = useFetch("http://localhost:8000/api/inventory");
  const dispatch = useNotification();

  const handleUpload = async (e) => {
    try {
      const truncate = new Promise((resolve, reject) => {
        fetch("http://localhost:8000/api/inventory", {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => resolve(data));
      });
      truncate.then((res) => {
        const files = e.target.files;
        const formData = new FormData();
        formData.append("csv", files[0]);

        fetch("http://localhost:8000/api/inventory/upload", {
          method: "POST",
          body: formData,
        })
          .then((res) => {
            if (!res.ok) {
              throw new Error(res.json());
            }
            return res.text();
          })
          .then((data) => {
            dispatch({
              type: "SUCCESS",
              message: data,
              title: "Успех",
            });
          })
          .catch((e) => {
            console.log(e.message);
          });
      });
    } catch (e) {
      console.log(e.message);
      dispatch({
        type: "SUCCESS",
        message: "Ошибка при загрузке",
      });
    }
  };

  const toggleForm = () => {
    document.querySelector(".form").classList.toggle("slide");
    setOpen(!open);
  };

  return (
    <>
      <div
        className="header"
        onClick={() => {
          toggleForm();
        }}
      >
        <h2>Загрузить инвентаризацинную опись</h2>
        <FontAwesomeIcon icon={open ? faChevronDown : faChevronUp} />
      </div>
      <div className="uploader form">
        <label htmlFor="csv">Загрузить csv файл</label>
        <input
          accept=".csv"
          className="uploader"
          id="csv"
          onChange={(e) => {
            handleUpload(e);
          }}
          type="file"
        />
      </div>

      <div className="flex">
        {isPending ? (
          <Loading />
        ) : (
          <table>
            <thead>
              <tr key={9999}>
                <th>Позиция в ведомости</th>
                <th>Наименование</th>
                <th>Место</th>
                <th>Количество</th>
                <th>Приоритет</th>
              </tr>
            </thead>
            <tbody>
              {data !== null &&
                data.map((row) => {
                  return (
                    <tr key={row.id}>
                      <td>{row.vedpos}</td>
                      <td>{row.name}</td>
                      <td>{row.place}</td>
                      <td>{row.kolvo}</td>
                      <td>{row.placepriority}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}