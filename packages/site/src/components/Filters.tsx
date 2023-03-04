import React, { useState } from "react";
import {
  Box,
  Grid,
  Typography,
  FormControlLabel,
  Checkbox,
  Slider,
  TextField,
} from "@mui/material";

import Button from "@mui/material/Button";

interface FilterComponentProps {
  onFiltersChange: (filters: Filters) => void;
}

interface Filters {
  hasMaliciousContract: boolean;
  hasTornadoCash: boolean;
  amountEth: {
    min: number;
    max: number;
  };
  numTrasactions: {
    min: number;
    max: number;
  };
}

export const FilterComponent: React.FC<FilterComponentProps> = ({ onFiltersChange }) => {
  const [filters, setFilters] = useState<Filters>({
    hasMaliciousContract: false,
    hasTornadoCash: false,
    amountEth: {
      min: 0,
      max: 10000,
    },
    numTrasactions: {
      min: 0,
      max: 10000,
    },
  });

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: checked,
    }));
  };

  const handleamountEthChange = (event: Event, newValue: number | number[]) => {
    const [min, max] = newValue as number[];
    setFilters((prevFilters) => ({
      ...prevFilters,
      amountEth: {
        ...prevFilters.amountEth,
        min,
        max,
      },
    }));
  };

  const handlenumTrasactionsChange = (event: Event, newValue: number | number[]) => {
    const [min, max] = newValue as number[];
    setFilters((prevFilters) => ({
      ...prevFilters,
      numTrasactions: {
        ...prevFilters.numTrasactions,
        min,
        max,
      },
    }));
  };

  const handleFiltersChange = () => {
    onFiltersChange(filters);
  };

  return (
    <Box sx={styles.filterContainer}>
      <Typography variant="h5" sx={styles.filterHeading}>
        Filters
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Checkbox
                checked={filters.hasMaliciousContract}
                onChange={handleCheckboxChange}
                name="hasMaliciousContract"
                sx={styles.checkbox}
              />
            }
            label="No interaction with malicious contracts"
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Checkbox
                checked={filters.hasTornadoCash}
                onChange={handleCheckboxChange}
                name="hasTornadoCash"
                sx={styles.checkbox}
              />
            }
            label="No interaction with tornado.cash"
          />
        </Grid>
        <Grid item xs={12}>
          <Typography gutterBottom sx={styles.sliderHeading}>
            Amount of Ethereum
          </Typography>
          <Slider
            value={[filters.amountEth.min, filters.amountEth.max]}
            onChange={handleamountEthChange}
            min={0}
            max={1000}
            step={0.001}
            valueLabelDisplay="auto"
            sx={styles.slider}
          />

          <Box sx={styles.sliderValueContainer}>
            <TextField
              size="small"
              variant="outlined"
              value={filters.amountEth.min}
              onChange={(event) =>
                setFilters((prevFilters) => ({
                  ...prevFilters,
                  amountEth: {
                    ...prevFilters.amountEth,
                    min: Number(event.target.value),
                  },
                }))
              }
              sx={styles.sliderValue}
            />
            <Typography variant="body2" sx={styles.sliderValueSeparator}>
              to
            </Typography>
            <TextField
              size="small"
              variant="outlined"
              value={filters.amountEth.max}
              onChange={(event) =>
                setFilters((prevFilters) => ({
                  ...prevFilters,
                  amountEth: {
                    ...prevFilters.amountEth,
                    max: Number(event.target.value),
                  },
                }))
              }
              sx={styles.sliderValue}
            />
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Typography gutterBottom sx={styles.sliderHeading}>
            Total number of transactions
          </Typography>
          <Slider
            value={[filters.numTrasactions.min, filters.numTrasactions.max]}
            onChange={handlenumTrasactionsChange}
            min={0}
            max={10000}
            step={1}
            valueLabelDisplay="auto"
            sx={styles.slider}
          />
          <Box sx={styles.sliderValueContainer}>
            <TextField
              size="small"
              variant="outlined"
              value={filters.numTrasactions.min}
              onChange={(event) =>
                setFilters((prevFilters) => ({
                  ...prevFilters,
                  numTrasactions: {
                    ...prevFilters.numTrasactions,
                    min: Number(event.target.value),
                  },
                }))
              }
              sx={styles.sliderValue}
            />
            <Typography variant="body2" sx={styles.sliderValueSeparator}>
              to
            </Typography>
            <TextField
              size="small"
              variant="outlined"
              value={filters.numTrasactions.max}
              onChange={(event) =>
                setFilters((prevFilters) => ({
                  ...prevFilters,
                  numTrasactions: {
                    ...prevFilters.numTrasactions,
                    max: Number(event.target.value),
                  },
                }))
              }
              sx={styles.sliderValue}
            />
          </Box>
        </Grid>
      </Grid>
      <Box sx={styles.filterButtonContainer}>
        <Button variant="contained" onClick={handleFiltersChange}>
          Apply Filters
        </Button>
      </Box>
    </Box>
  );
};
const styles = {
  filterContainer: {
    padding: "16px",
    backgroundColor: "#f9f9f9",
    marginBottom: "10px",
  },
  filterHeading: {
    marginBottom: "16px",
  },
  checkbox: {
    "& .MuiSvgIcon-root": {
      fontSize: "1.5rem",
    },
  },
  slider: {
    width: "100%",
  },
  sliderHeading: {
    marginBottom: "8px",
  },
  sliderValueContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    margin: "8px 0",
  },
  sliderValue: {
    width: "50px",
  },
  sliderValueSeparator: {
    margin: "0 8px",
  },
  filterButtonContainer: {
    display: "flex",
    justifyContent: "center",
    marginTop: "16px",
  },
};