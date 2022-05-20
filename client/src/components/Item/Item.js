import React from "react";
import { useSelector } from "react-redux";
import "./Item.css";

export default function Item({ openModal, data, showPlaces }) {
  const { sredstva, types, storages } = useSelector((state) => state.info);

  return (
    <>
      <tr data-id={data?.qr} key={data?.qr} onClick={() => openModal(data?.qr)}>
        <td>{data?.qr}</td>
        <td>{sredstva[data?.sredstvo - 1]?.label}</td>
        <td>{types[data.type - 1]?.label}</td>
        <td>{data?.month}</td>
        <td>{data?.year}</td>
        <td>
          {showPlaces
            ? storages.filter((storage) => storage.value === data.storage)?.[0]
                ?.label
            : data?.name}
        </td>
        <td>{data?.model}</td>
        <td>{data?.sernom}</td>
      </tr>
    </>
  );
}
