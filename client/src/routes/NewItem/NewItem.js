import React, { useEffect, useState } from "react";
import Input from "components/Form/Input/Input";
import SelectInput from "components/Form/Select/Select";
import useForm from "hooks/useForm";
import { useDispatch, useSelector } from "react-redux";
import QR from "components/QR/QR";
import $api from "http/index.js";
import NewItemSubmit from "./NewItemSubmit";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

export default function NewItem({ close }) {
  const { storages, statuses, sredstva, persons, types, owners } = useSelector(
    (state) => state.info
  );
  const {
    qr: qrRedux,
    name: nameRedux,
    sredstvo: sredstvoRedux,
    type: typeRedux,
    month: monthRedux,
    year: yearRedux,
    model: modelRedux,
    sernom: sernomRedux,
    info: infoRedux,
    status: statusRedux,
    person: personRedux,
    storage: storageRedux,
    addinfo: addinfoRedux,
    owner: ownerRedux,
  } = useSelector((state) => state.total.newItemValues);
  const { data, initialItemData } = useSelector((state) => state.total);
  const [sernomExists, setSernomExists] = useState(false);
  const [lastQR, setLastQR] = useState(0);
  const [names, setNames] = useState([]);

  const {
    values: {
      qr,
      name,
      sredstvo,
      type,
      month,
      year,
      model,
      sernom,
      info,
      status,
      person,
      storage,
      addinfo,
      owner,
    },
    changeHandler,
    selectChangeHandler,
  } = useForm(
    {
      qr: ("00000" + (Number(qrRedux || lastQR) + 1)).slice(-5),
      name: nameRedux || "",
      sredstvo: sredstvoRedux || "",
      type: typeRedux || "",
      month: monthRedux || "",
      year: yearRedux || "",
      model: modelRedux || "",
      sernom: sernomRedux || "",
      info: infoRedux || "",
      status: statusRedux || "",
      person: personRedux || "",
      storage: storageRedux || "",
      addinfo: addinfoRedux || "",
      owner: ownerRedux || "",
    },
    "newItem"
  );

  console.log({
    qrRedux,
    nameRedux,
    sredstvoRedux,
    typeRedux,
    monthRedux,
    yearRedux,
    modelRedux,
    sernomRedux,
    infoRedux,
    statusRedux,
    personRedux,
    storageRedux,
    addinfoRedux,
    ownerRedux,
  });

  const onNewItemFormSubmit = NewItemSubmit();

  const { changeNewItemInRedux } = useForm();

  const onSubmit = (e) => {
    e.preventDefault();
    onNewItemFormSubmit(close);
  };

  useEffect(() => {
    const getLastQR = async () => {
      const { data: lastQR } = await $api.get("total/getLastQR");
      changeHandler({
        target: {
          value: ("00000" + (Number(lastQR[0].qr) + 1)).slice(-5),
          name: "qr",
        },
      });
      setLastQR(lastQR[0].qr);
    };
    getLastQR();
    const getNames = async () => {
      const { data: names } = await $api.get("names");
      setNames(names);
    };
    getNames();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedData = await $api
        .get(`total/checkSerialNum/${sernom}`)
        .then(({ data }) => data);
      setSernomExists(fetchedData);
    };
    fetchData();
  }, [sernom]);

  return (
    <>
      {lastQR ? (
        <p className="table-info">?????????????????? ?????????????? QR : {lastQR}</p>
      ) : null}
      <div className="new_item__form">
        <form className="form" id="newItem" onSubmit={onSubmit}>
          <div className="form-inputs">
            <SelectInput
              required
              span="???????????????? ?????? ????????????????????"
              name="type"
              data={types}
              selectValue={typeRedux}
              onSelectChange={selectChangeHandler}
            />
            <SelectInput
              required
              span="???????????????? ????????????????"
              name="sredstvo"
              data={sredstva}
              selectValue={sredstvoRedux}
              onSelectChange={selectChangeHandler}
            />
            <SelectInput
              required
              span="???????????????? ????????????"
              name="status"
              data={statuses}
              selectValue={statusRedux}
              onSelectChange={selectChangeHandler}
            />
            <SelectInput
              required
              span="???????????????? ??????"
              name="person"
              data={persons}
              selectValue={personRedux}
              onSelectChange={selectChangeHandler}
            />
          </div>
          <div className="form-inputs">
            <SelectInput
              required
              span="???????????????? ??????????????????"
              name="owner"
              data={owners}
              selectValue={ownerRedux}
              onSelectChange={selectChangeHandler}
            />
            <SelectInput
              required
              span="???????????????? ????????????????????????????"
              name="storage"
              data={storages}
              selectValue={storageRedux}
              onSelectChange={selectChangeHandler}
            />
          </div>
          <div className="form-inputs">
            <Input
              span="?????????????? ?????????? QR ????????"
              name="qr"
              type="number"
              value={qr}
              onChange={changeHandler}
              formName="newItem"
            />
            <Input
              span="?????????? ??????????"
              type="number"
              name="month"
              max="12"
              value={month}
              onChange={changeHandler}
              formName="newItem"
            />
            <Input
              span="?????? ?????????? ?? ????????????????????????"
              type="number"
              name="year"
              value={year}
              max="40"
              onChange={changeHandler}
              formName="newItem"
            />
          </div>

          <div className="form-inputs">
            <Autocomplete
              sx={{
                "flex-direction": "column",
                display: "flex",
                width: "100%",
                margin: "10px 20px 10px 0px",
              }}
              fullWidth
              freeSolo
              disableClearable
              id="name"
              inputValue={name}
              onChange={(event, newValue) => {
                changeHandler({ target: { name: "name", value: newValue } });
                changeNewItemInRedux({
                  target: { name: "name", value: newValue },
                });
              }}
              options={names.map((option) => option.name)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  name="name"
                  label="???????????????????????? ???? ????????????????"
                  onChange={changeHandler}
                  onBlur={changeNewItemInRedux}
                />
              )}
            />
          </div>
          <div className="form-inputs">
            <Input
              span="???????????? ????????????????"
              name="model"
              value={model}
              onChange={changeHandler}
              formName="newItem"
            />

            <Input
              span="???????????????? ??????????"
              name="sernom"
              value={sernom}
              onChange={changeHandler}
              formName="newItem"
            >
              {sernomExists && (
                <span className="input-comment">
                  ???????????? ???????????????? ?????????? ?????? ????????????????????????
                </span>
              )}
            </Input>
          </div>
          <div className="form-inputs">
            <Input
              span="????????????????????"
              name="info"
              required={false}
              value={info}
              onChange={changeHandler}
              formName="newItem"
            />
          </div>
          <div className="form-inputs">
            <Input
              span="???????????????????????????? ???????????????????? (ip, ??????????, ????????????)"
              name="addinfo"
              required={false}
              value={addinfo}
              onChange={changeHandler}
              formName="newItem"
            />
          </div>
          <button className="btn success" type="submit">
            ????????????????
          </button>
        </form>
        <QR
          month={month}
          year={year}
          name={name}
          qr={qr}
          model={model}
          sernom={sernom}
          sredstvo={sredstvo}
          type={type}
        />
      </div>
    </>
  );
}
