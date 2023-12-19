import React, { useState } from "react";
import "../style/wattage.css";

const WattageCal = () => {
  const [cpuPower, setCpuPower] = useState(0);
  const [gpuPower, setGpuPower] = useState(0);
  const [ramPower, setRamPower] = useState(0);
  const [motherboardPower, setMotherboardPower] = useState(0);
  const [ssdPower, setSsdPower] = useState(0);
  const [totalWattage, setTotalWattage] = useState(0);

  const calculateWattage = () => {
    const calculatedWattage =
      cpuPower + gpuPower + ramPower + motherboardPower + ssdPower;

    setTotalWattage(calculatedWattage);
  };

  return (
    <div>
      <form>
        <label htmlFor="cpuPower">Select CPU:</label>
        <select
          id="cpuPower"
          value={cpuPower}
          onChange={(e) => setCpuPower(parseFloat(e.target.value) || 0)}
        >
          <option value="0">Select</option>
          <option value="120">i9 9900</option>
          <option value="150">i9 9960x</option>
          <option value="180">i9 9900k</option>
          <option value="100">i5 11400</option>
          <option value="110">i5 11600</option>
          <option value="130">i5 11600k</option>
          <option value="150">i7 11700</option>
          <option value="170">i7 11700k</option>
          <option value="170">i7 11800ks</option>
          <option value="175">i7 13700</option>
          <option value="185">i7 13700k</option>
          <option value="185">i7 13700ks</option>
          <option value="195">i7 14700</option>
          <option value="200">i7 14700k</option>
          <option value="200">i7 14700ks</option>
          <option value="200">i9 13900</option>
          <option value="210">i9 13900k</option>
          <option value="200">i9 12900</option>
          <option value="220">i9 12900k</option>
          <option value="220">i9 12900ks</option>
          <option value="230">i9 14900</option>
          <option value="250">i9 14900k</option>
          <option value="250">i9 14900ks</option>
        </select>

        <label htmlFor="gpuPower">Select GPU:</label>
        <select
          id="gpuPower"
          value={gpuPower}
          onChange={(e) => setGpuPower(parseFloat(e.target.value) || 0)}
        >
          <option value="0">No GPU</option>
          <option value="400">RTX 4090</option>
          <option value="300">RTX 4080</option>
          <option value="270">RTX 4070Ti</option>
          <option value="250">RTX 4070</option>
          <option value="240">RTX 4060Ti</option>
          <option value="220">RTX 4060</option>
          <option value="200">RTX 3070</option>
          <option value="250">RTX 3080</option>
          <option value="270">RTX 3080Ti</option>
          <option value="225">RTX 3070</option>
          <option value="240">RTX 3070Ti</option>
        </select>

        <label htmlFor="motherboardPower">Select Motherboard:</label>
        <select
          id="motherboardPower"
          value={motherboardPower}
          onChange={(e) => setMotherboardPower(parseFloat(e.target.value) || 0)}
        >
          <option value="0">Select</option>
          <option value="180">ATX</option>
          <option value="180">E-ATX</option>
          <option value="200">Micro-ATX</option>
          <option value="170">MINI-ITX</option>
          <option value="210">Thin-MINI-ITX</option>
          <option value="210">SSI CEP</option>
          <option value="250">SSI EEP</option>
          <option value="280">XL AT</option>
        </select>

        <label htmlFor="ramPower">Select RAM:</label>
        <select
          id="ramPower"
          value={ramPower}
          onChange={(e) => setRamPower(parseFloat(e.target.value) || 0)}
        >
          <option value="0">Select</option>
          <option value="65">128GB DDR5</option>
          <option value="60">64GB DDR5</option>
          <option value="55">32GB DDR5</option>
          <option value="50">16GB DDR5</option>
          <option value="40">8GB DDR5</option>
          <option value="30">4GB DDR5</option>
          <option value="55">128GB DDR4</option>
          <option value="50">64GB DDR4</option>
          <option value="45">32GB DDR4</option>
          <option value="40">16GB DDR4</option>
          <option value="30">8GB DDR4</option>
        </select>

        <label htmlFor="ssdPower">Select SSD:</label>
        <select
          id="ssdPower"
          value={ssdPower}
          onChange={(e) => setSsdPower(parseFloat(e.target.value) || 0)}
        >
          <option value="0">Select</option>
          <option value="15">Under 120GB</option>
          <option value="16">120GB - 256GB</option>
          <option value="20">256GB - 512GB</option>
          <option value="20">512GB - 1TB</option>
          <option value="24">1TB+</option>
        </select>

        <button type="button" onClick={calculateWattage}>
          Calculate
        </button>
      </form>
      <p className="total">Total Wattage: {totalWattage}W</p>
    </div>
  );
};

export default WattageCal;
