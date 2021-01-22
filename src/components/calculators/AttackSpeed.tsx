import React, { useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import {
  baseSpeedOptions,
  CalculateAttackSpeed,
  calculateMinAndMax,
  DefaultSpeedOption,
  framePerSecond,
} from '../../utils/attackSpeed';
import { Paper, RadioGroup } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';
import Select from '@material-ui/core/Select';
import FormHelperText from '@material-ui/core/FormHelperText';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormLabel from '@material-ui/core/FormLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Radio from '@material-ui/core/Radio';

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

const AttackSpeed: React.FC = () => {
  const classes = useStyles();
  const [baseSpeed, setBaseSpeed] = useState<string>('1.00');
  const [weaponSpeedOption, setWeaponSpeedOption] = useState<number>(0);
  const [subWeaponSpeedOption, setSubWeaponSpeedOption] = useState<number>(0);
  const [necklaceSpeedOption, setNecklaceSpeedOption] = useState<number>(0);
  const [helmetSpeedOption, setHelmetSpeedOption] = useState<number>(0);
  const [upperBackSpeedOption, setUpperBackSpeedOption] = useState<number>(0);
  const [beltSpeedOption, setBeltSpeedOption] = useState<number>(0);
  const [glovesSpeedOption, setGlovesSpeedOption] = useState<number>(0);
  const [armorSpeedOption, setArmorSpeedOption] = useState<number>(0);
  const [shoesSpeedOption, setShoesSpeedOption] = useState<number>(0);
  const [firstRingSpeedOption, setFirstRingSpeedOption] = useState<number>(0);
  const [secondRingSpeedOption, setSecondRingSpeedOption] = useState<number>(0);
  const [thirdRingSpeedOption, setThridRingSpeedOption] = useState<number>(0);
  const [fourthRingSpeedOption, setFourthRingSpeedOption] = useState<number>(0);
  const [fifthRingSpeedOption, setFifthRingSpeedOption] = useState<number>(0);
  const [sixthRingSpeedOption, setSixthRingSpeedOption] = useState<number>(0);
  const [seventhRingSpeedOption, setSeventhRingSpeedOption] = useState<number>(0);
  const [eighthRingSpeedOption, setEighthRingSpeedOption] = useState<number>(0);
  const [ninthRingSpeedOption, setNinthRingSpeedOption] = useState<number>(0);
  const [tenthRingSpeedOption, setTenthRingSpeedOption] = useState<number>(0);

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

  const reducer = (accumulator?: number, currentValue?: number) => {
    const x = accumulator ? accumulator : 0;
    const y = currentValue ? currentValue : 0;
    return x + y;
  };
  const options = [
    DefaultSpeedOption,
    weaponSpeedOption,
    subWeaponSpeedOption,
    necklaceSpeedOption,
    helmetSpeedOption,
    upperBackSpeedOption,
    beltSpeedOption,
    glovesSpeedOption,
    armorSpeedOption,
    shoesSpeedOption,
    firstRingSpeedOption,
    secondRingSpeedOption,
    thirdRingSpeedOption,
    fourthRingSpeedOption,
    fifthRingSpeedOption,
    sixthRingSpeedOption,
    seventhRingSpeedOption,
    eighthRingSpeedOption,
    ninthRingSpeedOption,
    tenthRingSpeedOption,
    enchantSpeedOption,
  ];
  const amountSpeedOption = options.reduce(reducer, 0);

  const as = CalculateAttackSpeed(Number(baseSpeed), amountSpeedOption);
  const asPerSecond = Math.round(framePerSecond / as);
  const speedOptionError = asPerSecond === Infinity;
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEnchant((event.target as HTMLInputElement).value);
  };

  const [min] = calculateMinAndMax(Number(baseSpeed), as - 1);
  const nextFrame = as - 1;

  return (
    <Paper elevation={2}>
      <Box component="div" mt={2} mb={2} p={2}>
        <Box fontWeight="fontWeightBold" mt={1}>
          合計速度：{amountSpeedOption}%<br />
          {as}フレーム - 攻撃回数： {Math.round(framePerSecond / as)}回/秒
          <br />
          {amountSpeedOption > 20 && nextFrame > 1 && (
            <Typography variant="caption">
              {nextFrame}フレームにはあと {min - amountSpeedOption}% 必要
            </Typography>
          )}
        </Box>

        <Box component="div" m={2}>
          <FormControl component="fieldset">
            <FormLabel component="legend">武器</FormLabel>
            <FormGroup row>
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
                <FormHelperText id="weapon-speed-option-helper-text">
                  基本攻撃速度（秒）
                </FormHelperText>
              </FormControl>
              <FormControl className={classes.formControl}>
                <TextField
                  style={{ width: 160 }}
                  error={speedOptionError}
                  helperText={
                    speedOptionError ? '速度オプション値が過大です' : '攻撃速度オプション'
                  }
                  id="weapon-speed-option"
                  value={weaponSpeedOption}
                  onChange={(e) => {
                    let value = Number(e.target.value);
                    if (isNaN(value)) {
                      value = 0;
                    }
                    setWeaponSpeedOption(value);
                  }}
                  aria-describedby="weapon-speed-option-helper-text"
                  InputProps={{
                    'aria-label': 'weapon-speed-option',
                    endAdornment: <InputAdornment position="end">%</InputAdornment>,
                  }}
                  className={classes.selectEmpty}
                />
              </FormControl>
            </FormGroup>
          </FormControl>
        </Box>
        <Box component="div" mx={2}>
          <FormLabel component="legend">防具</FormLabel>
          <FormGroup row>
            <FormControl className={classes.formControl}>
              <TextField
                style={{ width: 160 }}
                size="small"
                label="補助武器"
                error={speedOptionError}
                helperText={speedOptionError ? '速度オプション値が過大です' : '攻撃速度オプション'}
                id="sub-weapon-speed-option"
                value={subWeaponSpeedOption}
                onChange={(e) => {
                  let value = Number(e.target.value);
                  if (isNaN(value)) {
                    value = 0;
                  }
                  setSubWeaponSpeedOption(value);
                }}
                aria-describedby="sub-weapon-speed-option-helper-text"
                InputProps={{
                  'aria-label': 'sub-weapon-speed-option',
                  endAdornment: <InputAdornment position="end">%</InputAdornment>,
                }}
                className={classes.selectEmpty}
              />
            </FormControl>
            <FormControl className={classes.formControl}>
              <TextField
                style={{ width: 160 }}
                size="small"
                label="ネックレス"
                error={speedOptionError}
                helperText={speedOptionError ? '速度オプション値が過大です' : '攻撃速度オプション'}
                id="necklace-speed-option"
                value={necklaceSpeedOption}
                onChange={(e) => {
                  let value = Number(e.target.value);
                  if (isNaN(value)) {
                    value = 0;
                  }
                  setNecklaceSpeedOption(value);
                }}
                aria-describedby="necklace-speed-option-helper-text"
                InputProps={{
                  'aria-label': 'necklace-speed-option',
                  endAdornment: <InputAdornment position="end">%</InputAdornment>,
                }}
                className={classes.selectEmpty}
              />
            </FormControl>
            <FormControl className={classes.formControl}>
              <TextField
                style={{ width: 160 }}
                size="small"
                label="兜"
                error={speedOptionError}
                helperText={speedOptionError ? '速度オプション値が過大です' : '攻撃速度オプション'}
                id="helmet-speed-option"
                value={helmetSpeedOption}
                onChange={(e) => {
                  let value = Number(e.target.value);
                  if (isNaN(value)) {
                    value = 0;
                  }
                  setHelmetSpeedOption(value);
                }}
                aria-describedby="helmet-speed-option-helper-text"
                InputProps={{
                  'aria-label': 'helmet-speed-option',
                  endAdornment: <InputAdornment position="end">%</InputAdornment>,
                }}
                className={classes.selectEmpty}
              />
            </FormControl>
            <FormControl className={classes.formControl}>
              <TextField
                style={{ width: 160 }}
                size="small"
                label="マント/耳飾り"
                error={speedOptionError}
                helperText={speedOptionError ? '速度オプション値が過大です' : '攻撃速度オプション'}
                id="upper-back-speed-option"
                value={upperBackSpeedOption}
                onChange={(e) => {
                  let value = Number(e.target.value);
                  if (isNaN(value)) {
                    value = 0;
                  }
                  setUpperBackSpeedOption(value);
                }}
                aria-describedby="upper-back-speed-option-helper-text"
                InputProps={{
                  'aria-label': 'upper-back-speed-option',
                  endAdornment: <InputAdornment position="end">%</InputAdornment>,
                }}
                className={classes.selectEmpty}
              />
            </FormControl>
          </FormGroup>
        </Box>
        <Box component="div" mx={2}>
          <FormGroup row>
            <FormControl className={classes.formControl}>
              <TextField
                style={{ width: 160 }}
                size="small"
                label="ベルト"
                error={speedOptionError}
                helperText={speedOptionError ? '速度オプション値が過大です' : '攻撃速度オプション'}
                id="belt-speed-option"
                value={beltSpeedOption}
                onChange={(e) => {
                  let value = Number(e.target.value);
                  if (isNaN(value)) {
                    value = 0;
                  }
                  setBeltSpeedOption(value);
                }}
                aria-describedby="belt-speed-option-helper-text"
                InputProps={{
                  'aria-label': 'belt-speed-option',
                  endAdornment: <InputAdornment position="end">%</InputAdornment>,
                }}
                className={classes.selectEmpty}
              />
            </FormControl>
            <FormControl className={classes.formControl}>
              <TextField
                style={{ width: 160 }}
                size="small"
                label="グローブ"
                error={speedOptionError}
                helperText={speedOptionError ? '速度オプション値が過大です' : '攻撃速度オプション'}
                id="gloves-speed-option"
                value={glovesSpeedOption}
                onChange={(e) => {
                  let value = Number(e.target.value);
                  if (isNaN(value)) {
                    value = 0;
                  }
                  setGlovesSpeedOption(value);
                }}
                aria-describedby="gloves-speed-option-helper-text"
                InputProps={{
                  'aria-label': 'gloves-speed-option',
                  endAdornment: <InputAdornment position="end">%</InputAdornment>,
                }}
                className={classes.selectEmpty}
              />
            </FormControl>
            <FormControl className={classes.formControl}>
              <TextField
                style={{ width: 160 }}
                size="small"
                label="鎧"
                error={speedOptionError}
                helperText={speedOptionError ? '速度オプション値が過大です' : '攻撃速度オプション'}
                id="armor-speed-option"
                value={armorSpeedOption}
                onChange={(e) => {
                  let value = Number(e.target.value);
                  if (isNaN(value)) {
                    value = 0;
                  }
                  setArmorSpeedOption(value);
                }}
                aria-describedby="armor-speed-option-helper-text"
                InputProps={{
                  'aria-label': 'armor-speed-option',
                  endAdornment: <InputAdornment position="end">%</InputAdornment>,
                }}
                className={classes.selectEmpty}
              />
            </FormControl>
            <FormControl className={classes.formControl}>
              <TextField
                style={{ width: 160 }}
                size="small"
                label="シューズ"
                error={speedOptionError}
                helperText={speedOptionError ? '速度オプション値が過大です' : '攻撃速度オプション'}
                id="shoes-speed-option"
                value={shoesSpeedOption}
                onChange={(e) => {
                  let value = Number(e.target.value);
                  if (isNaN(value)) {
                    value = 0;
                  }
                  setShoesSpeedOption(value);
                }}
                aria-describedby="shoes-speed-option-helper-text"
                InputProps={{
                  'aria-label': 'shoes-speed-option',
                  endAdornment: <InputAdornment position="end">%</InputAdornment>,
                }}
                className={classes.selectEmpty}
              />
            </FormControl>
          </FormGroup>
        </Box>
        <Box component="div" mt={2} mx={2}>
          <FormGroup row>
            <FormControl className={classes.formControl}>
              <TextField
                style={{ width: 160 }}
                size="small"
                label="指輪1"
                error={speedOptionError}
                helperText={speedOptionError ? '速度オプション値が過大です' : '攻撃速度オプション'}
                id="ring1-speed-option"
                value={firstRingSpeedOption}
                onChange={(e) => {
                  let value = Number(e.target.value);
                  if (isNaN(value)) {
                    value = 0;
                  }
                  setFirstRingSpeedOption(value);
                }}
                aria-describedby="ring1-speed-option-helper-text"
                InputProps={{
                  'aria-label': 'ring1-speed-option',
                  endAdornment: <InputAdornment position="end">%</InputAdornment>,
                }}
                className={classes.selectEmpty}
              />
            </FormControl>
            <FormControl className={classes.formControl}>
              <TextField
                style={{ width: 160 }}
                size="small"
                label="指輪2"
                error={speedOptionError}
                helperText={speedOptionError ? '速度オプション値が過大です' : '攻撃速度オプション'}
                id="ring2-speed-option"
                value={secondRingSpeedOption}
                onChange={(e) => {
                  let value = Number(e.target.value);
                  if (isNaN(value)) {
                    value = 0;
                  }
                  setSecondRingSpeedOption(value);
                }}
                aria-describedby="ring2-speed-option-helper-text"
                InputProps={{
                  'aria-label': 'ring2-speed-option',
                  endAdornment: <InputAdornment position="end">%</InputAdornment>,
                }}
                className={classes.selectEmpty}
              />
            </FormControl>
            <FormControl className={classes.formControl}>
              <TextField
                style={{ width: 160 }}
                size="small"
                label="指輪3"
                error={speedOptionError}
                helperText={speedOptionError ? '速度オプション値が過大です' : '攻撃速度オプション'}
                id="ring3-speed-option"
                value={thirdRingSpeedOption}
                onChange={(e) => {
                  let value = Number(e.target.value);
                  if (isNaN(value)) {
                    value = 0;
                  }
                  setThridRingSpeedOption(value);
                }}
                aria-describedby="ring3-speed-option-helper-text"
                InputProps={{
                  'aria-label': 'ring3-speed-option',
                  endAdornment: <InputAdornment position="end">%</InputAdornment>,
                }}
                className={classes.selectEmpty}
              />
            </FormControl>
            <FormControl className={classes.formControl}>
              <TextField
                style={{ width: 160 }}
                size="small"
                label="指輪4"
                error={speedOptionError}
                helperText={speedOptionError ? '速度オプション値が過大です' : '攻撃速度オプション'}
                id="ring4-speed-option"
                value={fourthRingSpeedOption}
                onChange={(e) => {
                  let value = Number(e.target.value);
                  if (isNaN(value)) {
                    value = 0;
                  }
                  setFourthRingSpeedOption(value);
                }}
                aria-describedby="ring4-speed-option-helper-text"
                InputProps={{
                  'aria-label': 'ring4-speed-option',
                  endAdornment: <InputAdornment position="end">%</InputAdornment>,
                }}
                className={classes.selectEmpty}
              />
            </FormControl>
            <FormControl className={classes.formControl}>
              <TextField
                style={{ width: 160 }}
                size="small"
                label="指輪5"
                error={speedOptionError}
                helperText={speedOptionError ? '速度オプション値が過大です' : '攻撃速度オプション'}
                id="ring5-speed-option"
                value={fifthRingSpeedOption}
                onChange={(e) => {
                  let value = Number(e.target.value);
                  if (isNaN(value)) {
                    value = 0;
                  }
                  setFifthRingSpeedOption(value);
                }}
                aria-describedby="ring5-speed-option-helper-text"
                InputProps={{
                  'aria-label': 'ring5-speed-option',
                  endAdornment: <InputAdornment position="end">%</InputAdornment>,
                }}
                className={classes.selectEmpty}
              />
            </FormControl>
          </FormGroup>
          <FormGroup row>
            <FormControl className={classes.formControl}>
              <TextField
                style={{ width: 160 }}
                size="small"
                label="指輪6"
                error={speedOptionError}
                helperText={speedOptionError ? '速度オプション値が過大です' : '攻撃速度オプション'}
                id="ring6-speed-option"
                value={sixthRingSpeedOption}
                onChange={(e) => {
                  let value = Number(e.target.value);
                  if (isNaN(value)) {
                    value = 0;
                  }
                  setSixthRingSpeedOption(value);
                }}
                aria-describedby="ring6-speed-option-helper-text"
                InputProps={{
                  'aria-label': 'ring6-speed-option',
                  endAdornment: <InputAdornment position="end">%</InputAdornment>,
                }}
                className={classes.selectEmpty}
              />
            </FormControl>
            <FormControl className={classes.formControl}>
              <TextField
                style={{ width: 160 }}
                size="small"
                label="指輪7"
                error={speedOptionError}
                helperText={speedOptionError ? '速度オプション値が過大です' : '攻撃速度オプション'}
                id="ring7-speed-option"
                value={seventhRingSpeedOption}
                onChange={(e) => {
                  let value = Number(e.target.value);
                  if (isNaN(value)) {
                    value = 0;
                  }
                  setSeventhRingSpeedOption(value);
                }}
                aria-describedby="ring7-speed-option-helper-text"
                InputProps={{
                  'aria-label': 'ring7-speed-option',
                  endAdornment: <InputAdornment position="end">%</InputAdornment>,
                }}
                className={classes.selectEmpty}
              />
            </FormControl>
            <FormControl className={classes.formControl}>
              <TextField
                style={{ width: 160 }}
                size="small"
                label="指輪8"
                error={speedOptionError}
                helperText={speedOptionError ? '速度オプション値が過大です' : '攻撃速度オプション'}
                id="ring8-speed-option"
                value={eighthRingSpeedOption}
                onChange={(e) => {
                  let value = Number(e.target.value);
                  if (isNaN(value)) {
                    value = 0;
                  }
                  setEighthRingSpeedOption(value);
                }}
                aria-describedby="ring8-speed-option-helper-text"
                InputProps={{
                  'aria-label': 'ring8-speed-option',
                  endAdornment: <InputAdornment position="end">%</InputAdornment>,
                }}
                className={classes.selectEmpty}
              />
            </FormControl>
            <FormControl className={classes.formControl}>
              <TextField
                style={{ width: 160 }}
                margin="dense"
                size="small"
                label="指輪9"
                error={speedOptionError}
                helperText={speedOptionError ? '速度オプション値が過大です' : '攻撃速度オプション'}
                id="ring9-speed-option"
                value={ninthRingSpeedOption}
                onChange={(e) => {
                  let value = Number(e.target.value);
                  if (isNaN(value)) {
                    value = 0;
                  }
                  setNinthRingSpeedOption(value);
                }}
                aria-describedby="ring9-speed-option-helper-text"
                InputProps={{
                  'aria-label': 'ring9-speed-option',
                  endAdornment: <InputAdornment position="end">%</InputAdornment>,
                }}
                className={classes.selectEmpty}
              />
            </FormControl>
            <FormControl className={classes.formControl}>
              <TextField
                style={{ width: 160 }}
                size="small"
                label="指輪10"
                error={speedOptionError}
                helperText={speedOptionError ? '速度オプション値が過大です' : '攻撃速度オプション'}
                id="ring10-speed-option"
                value={tenthRingSpeedOption}
                onChange={(e) => {
                  let value = Number(e.target.value);
                  if (isNaN(value)) {
                    value = 0;
                  }
                  setTenthRingSpeedOption(value);
                }}
                aria-describedby="ring10-speed-option-helper-text"
                InputProps={{
                  'aria-label': 'ring10-speed-option',
                  endAdornment: <InputAdornment position="end">%</InputAdornment>,
                }}
                className={classes.selectEmpty}
              />
            </FormControl>
          </FormGroup>
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

export default AttackSpeed;
