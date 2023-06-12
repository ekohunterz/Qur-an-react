import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Card, Col, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import Footer from "./footer";
import Table from "react-bootstrap/Table";
import LiveClock from "./components/LiveClock";

export default function JadwalShalatTable() {
  const [jadwalShalat, setJadwalShalat] = useState({});
  const [jadwalShalatToday, setJadwalShalatToday] = useState({});
  const [kota, setKota] = useState([]);
  const [selectedKota, setSelectedKota] = useState("1105");
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;
  const currentDay = currentDate.getDate();
  const bulan = currentDate.toLocaleString("id-ID", { month: "long" });

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`https://api.myquran.com/v1/sholat/jadwal/${selectedKota}/${currentYear}/${currentMonth}`);
        const response2 = await axios.get("https://api.myquran.com/v1/sholat/kota/semua");
        const response3 = await axios.get(`https://api.myquran.com/v1/sholat/jadwal/${selectedKota}/${currentYear}/${currentMonth}/${currentDay}`);
        setJadwalShalat(response.data);
        setKota(response2.data);
        setJadwalShalatToday(response3.data);
      } catch (error) {
        console.log("Error:", error);
      }
    }

    fetchData();
  }, [selectedKota]);

  const handleChange = (event) => {
    setSelectedKota(event.target.value);
  };

  return (
    <>
      <Container>
        <Row className="my-5 d-flex">
          <Col md="12">
            <Card border="0" className="shadow-sm" style={{ backgroundColor: "#F9F7F5" }}>
              <Card.Body>
                <h3 className="text-center">JADWAL SHALAT UNTUK WILAYAH {jadwalShalat.data?.lokasi}</h3>
                <h5 className="text-center">
                  {bulan} {currentYear}
                </h5>
              </Card.Body>
            </Card>
          </Col>

          <Col md="12" className="mt-3">
            <Card border="0" className="shadow-sm" style={{ backgroundColor: "#F9F7F5" }}>
              <Card.Header>
                <Card.Title>
                  <h5 className="text-center">Jadwal Hari Ini</h5>
                </Card.Title>
              </Card.Header>
              <Card.Body>
                <Row className="justify-content-between">
                  <Col>
                    <p className="text-center">{jadwalShalatToday.data?.jadwal.tanggal}</p>
                  </Col>
                  <Col>
                    <h6 className="text-center">Imsak</h6>
                    <p className="text-center">{jadwalShalatToday.data?.jadwal.imsak}</p>
                  </Col>
                  <Col>
                    <h6 className="text-center">Subuh</h6>
                    <p className="text-center">{jadwalShalatToday.data?.jadwal.subuh}</p>
                  </Col>
                  <Col>
                    <h6 className="text-center">Terbit</h6>
                    <p className="text-center">{jadwalShalatToday.data?.jadwal.terbit}</p>
                  </Col>
                  <Col>
                    <h6 className="text-center">Dhuha</h6>
                    <p className="text-center">{jadwalShalatToday.data?.jadwal.dhuha}</p>
                  </Col>
                  <Col>
                    <h6 className="text-center">Dzuhur</h6>
                    <p className="text-center">{jadwalShalatToday.data?.jadwal.dzuhur}</p>
                  </Col>
                  <Col>
                    <h6 className="text-center">Ashar</h6>
                    <p className="text-center">{jadwalShalatToday.data?.jadwal.ashar}</p>
                  </Col>
                  <Col>
                    <h6 className="text-center">Maghrib</h6>
                    <p className="text-center">{jadwalShalatToday.data?.jadwal.maghrib}</p>
                  </Col>
                  <Col>
                    <h6 className="text-center">Isya</h6>
                    <p className="text-center">{jadwalShalatToday.data?.jadwal.isya}</p>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
          <Col md="3" xs="6" className="mt-3">
            <Form.Select aria-label="Default select example" onChange={handleChange}>
              <option>Pilih Kota</option>
              {kota.map((lokasi) => (
                <option key={lokasi.id} value={lokasi.id}>
                  {lokasi.lokasi}
                </option>
              ))}
            </Form.Select>
          </Col>
          <Col className="d-flex mt-3">
            <LiveClock />
          </Col>
        </Row>
        <Card className="p-1">
          <Table responsive striped hover>
            <thead>
              <tr>
                <th>Tanggal</th>
                <th>Imsak</th>
                <th>Subuh</th>
                <th>Terbit</th>
                <th>Dhuha</th>
                <th>Dzuhur</th>
                <th>Ashar</th>
                <th>Maghrib</th>
                <th>Isya</th>
              </tr>
            </thead>
            <tbody>
              {jadwalShalat.data?.jadwal.map((jadwal) => (
                <tr key={jadwal.tanggal}>
                  <td>{jadwal.tanggal}</td>
                  <td>{jadwal.imsak}</td>
                  <td>{jadwal.subuh}</td>
                  <td>{jadwal.terbit}</td>
                  <td>{jadwal.dhuha}</td>
                  <td>{jadwal.dzuhur}</td>
                  <td>{jadwal.ashar}</td>
                  <td>{jadwal.maghrib}</td>
                  <td>{jadwal.isya}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card>
      </Container>
      <Footer />
    </>
  );
}
