import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import FormHelperText from '@material-ui/core/FormHelperText';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Paper from '@material-ui/core/Paper';
import * as React from 'react';
import { useState } from 'react';
import { baseSpeedOptions, CalculateAttackSpeed, framePerSecond } from '../../utils/attackSpeed';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

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

const EasyAttackSpeed: React.FC = () => {
  const classes = useStyles();

  const [baseSpeed, setBaseSpeed] = useState<string>('1.00');
  const [speedOption, setSpeedOption] = useState<number>(0);

  const as = CalculateAttackSpeed(Number(baseSpeed), Number(speedOption));
  const asPerSecond = Math.round(framePerSecond / as);
  const speedOptionError = asPerSecond === Infinity;

  return (
    <Paper elevation={2}>
      <Box component="div" mt={2} mb={2} p={2}>
        <Typography variant="h6">簡易版</Typography>
        <Box fontWeight="fontWeightBold" mt={1}>
          {as}フレーム - 攻撃回数: {Math.round(framePerSecond / as)}回/秒
        </Box>

        <Box component="div" m={2}>
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
      </Box>
    </Paper>
  );
};

export default EasyAttackSpeed;
