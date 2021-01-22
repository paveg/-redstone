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
import {
  DefaultSpeedOption,
  baseSpeedOptions,
  CalculateAttackSpeed,
  calculateMinAndMax,
  framePerSecond,
} from '../../utils/attackSpeed';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { RadioGroup } from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import Switch from '@material-ui/core/Switch';

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

  const [enchant, setEnchant] = React.useState('haste');
  const [enchantLevel, setEnchantLevel] = React.useState(0);
  const [useEnchant, setUseEnchant] = React.useState(false);
  const [enchantSpeedOption, setEnchantSpeedOption] = React.useState(0);

  React.useEffect(() => {
    if (useEnchant && enchantLevel > 0) {
      switch (enchant) {
        case 'haste':
          setEnchantSpeedOption(10 + Math.floor(enchantLevel / 2));
          return;
        case 'recovery':
          setEnchantSpeedOption(5 + Math.floor(0.5 * enchantLevel));
          return;
        case 'nostalgia':
          setEnchantSpeedOption(30);
          return;
        case 'battleMarch':
          setEnchantSpeedOption(5 + Math.floor(0.2 * enchantLevel));
          return;
        case 'bloodRage':
          setEnchantSpeedOption(10);
          return;
        case 'beastBerserk':
          setEnchantSpeedOption(10 + Math.floor(0.2 * enchantLevel));
          return;
      }
    } else {
      setEnchantSpeedOption(0);
      return;
    }
  }, [useEnchant, enchant, enchantLevel]);

  const [baseSpeed, setBaseSpeed] = useState<string>('1.00');
  const [speedOption, setSpeedOption] = useState<number>(0);

  const amountSpeedOption = DefaultSpeedOption + speedOption + enchantSpeedOption;
  const as = CalculateAttackSpeed(Number(baseSpeed), Number(amountSpeedOption));
  const asPerSecond = Math.round(framePerSecond / as);
  const speedOptionError = asPerSecond === Infinity;

  const [min] = calculateMinAndMax(Number(baseSpeed), as - 1);
  const nextFrame = as - 1;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEnchant((event.target as HTMLInputElement).value);
  };

  return (
    <Paper elevation={2}>
      <Box component="div" mt={2} mb={2} p={2}>
        <Box fontWeight="fontWeightBold" mt={1}>
          {as}フレーム - 攻撃回数： {Math.round(framePerSecond / as)}回/秒
          <br />
          {amountSpeedOption > 20 && nextFrame > 1 && (
            <Typography variant="caption">
              {nextFrame}フレームにはあと {min - amountSpeedOption}% 必要
            </Typography>
          )}
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

        <Box component="div" m={2}>
          <Box component="div" mb={2}>
            <FormControlLabel
              control={
                <Switch
                  size="small"
                  checked={useEnchant}
                  onChange={() => {
                    setUseEnchant(!useEnchant);
                  }}
                  name="attack-speed-switch"
                />
              }
              label="支援スキル"
            />
          </Box>
          {useEnchant && (
            <FormControl component="fieldset">
              <RadioGroup
                aria-label="enchant-radio"
                name="enchant"
                value={enchant}
                onChange={handleChange}
              >
                <FormControlLabel value="haste" control={<Radio size="small" />} label="ヘイスト" />
                <FormControlLabel
                  value="recovery"
                  control={<Radio size="small" />}
                  label="リカバリー"
                />
                <FormControlLabel value="nostalgia" control={<Radio size="small" />} label="郷愁" />
                <FormControlLabel
                  value="battleMarch"
                  control={<Radio size="small" />}
                  label="バトルマーチ"
                />
                <FormControlLabel
                  value="bloodRage"
                  control={<Radio size="small" />}
                  label="ブラッドレイジ"
                />
                <FormControlLabel
                  value="beastBerserk"
                  control={<Radio size="small" />}
                  label="ビーストベルセルク"
                />
              </RadioGroup>
              <TextField
                error={speedOptionError}
                helperText={enchantLevel > 400 ? 'スキルレベルが過大です' : 'スキルレベル'}
                id="enchant-level"
                value={enchantLevel}
                onChange={(e) => {
                  let value = Number(e.target.value);
                  if (isNaN(value)) {
                    value = 0;
                  }
                  setEnchantLevel(value);
                }}
                aria-describedby="enchant-level-helper-text"
                InputProps={{
                  'aria-label': 'enchant-level',
                  endAdornment: <InputAdornment position="end">Lv</InputAdornment>,
                }}
                className={classes.selectEmpty}
              />
            </FormControl>
          )}
        </Box>
      </Box>
    </Paper>
  );
};

export default EasyAttackSpeed;
