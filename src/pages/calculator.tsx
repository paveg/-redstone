import * as React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Layout from '../components/Layout';
import { Container } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Select from '@material-ui/core/Select';
import { useState } from 'react';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }),
);

const baseSpeedOptions = [
  '0.75',
  '0.90',
  '1.00',
  '1.10',
  '1.20',
  '1.30',
  '1.40',
  '1.50',
  '1.60',
  '1.70',
  '1.80',
];

const framePerSecond = 16;

function calculateAttackSpeed(weaponAttackSpeed: number, speedOption: number) {
  const a = Math.floor(framePerSecond * weaponAttackSpeed);
  const b = 100 / (100 + speedOption);
  return Math.floor(a * b);
}

const Calculator: React.FC = () => {
  const classes = useStyles();
  const [baseSpeed, setBaseSpeed] = useState<string>('1.00');
  const [speedOption, setSpeedOption] = useState<number>(0);

  const as = calculateAttackSpeed(Number(baseSpeed), Number(speedOption));
  const asPerSecond = Math.round(framePerSecond / as);
  const speedOptionError = asPerSecond === Infinity;

  return (
    <>
      <Layout>
        <Container>
          <Typography variant="h4" align="center">
            攻撃速度計算機
          </Typography>
          <Typography variant="subtitle1" align="center">
            ※2018/01時点の仕様をベースに作成。2018年以降の仕様には未対応となります。
          </Typography>
          <Divider />
          <Typography variant="body1" align="center">
            RedStoneでは1秒 = 16フレーム
            <br />
            計算式（小数点以下は切り捨て)： (16 × 基本攻撃速度) × (100 / (100 + 速度オプション))
          </Typography>
          <Box component="div" m={2}>
            <Typography variant="h6" align="center">
              現在: {as}フレーム
              <br />
              秒間攻撃回数: {Math.round(framePerSecond / as)}回
            </Typography>

            <FormControl className={classes.formControl}>
              <Select
                native
                value={baseSpeed}
                onChange={(e) => {
                  if (typeof e.target.value !== 'string') return;
                  setBaseSpeed(e.target.value);
                }}
                name="base-speed"
                className={classes.selectEmpty}
              >
                {baseSpeedOptions.map((option) => {
                  return (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  );
                })}
              </Select>
              <FormHelperText id="speed-option-helper-text">基本攻撃速度（秒）</FormHelperText>
            </FormControl>
            <FormControl className={classes.formControl}>
              <TextField
                error={speedOptionError}
                helperText={
                  speedOptionError ? '速度オプション値が過大です' : '合計攻撃速度オプション'
                }
                id="speed-option"
                value={speedOption}
                onChange={(e) => {
                  let value = Number(e.target.value);
                  if (isNaN(value)) {
                    value = 0;
                  }
                  setSpeedOption(value);
                }}
                aria-describedby="speed-option-helper-text"
                InputProps={{
                  'aria-label': 'speed-option',
                  endAdornment: <InputAdornment position="end">%</InputAdornment>,
                }}
                className={classes.selectEmpty}
              />
            </FormControl>
          </Box>
        </Container>
      </Layout>
    </>
  );
};

export default Calculator;
