import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import Layout from '../components/Layout';
import { Container } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import EasyAttackSpeed from '../components/calculators/EasyAttackSpeed';
import AttackSpeed from '../components/calculators/AttackSpeed';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Divider from '@material-ui/core/Divider';
import Switch from '@material-ui/core/Switch';

const Calculator: React.FC = () => {
  const [detailCalculator, setDetailCalculator] = React.useState(false);

  let calculator;
  if (detailCalculator) {
    calculator = <AttackSpeed />;
  } else {
    calculator = <EasyAttackSpeed />;
  }

  return (
    <>
      <Layout>
        <Container>
          <Box component="div" mb={2}>
            <Typography variant="h4" align="center">
              攻撃速度計算機
            </Typography>
          </Box>
          <Box component="div" style={{ float: 'right' }} p={2}>
            <FormControlLabel
              control={
                <Switch
                  size="small"
                  checked={detailCalculator}
                  onChange={() => {
                    setDetailCalculator(!detailCalculator);
                  }}
                  name="attack-speed-switch"
                />
              }
              label="詳細"
            />
          </Box>
          {calculator}

          <Typography variant="caption">
            RedStoneでは1秒 = 16フレーム
            <br />
            計算式（小数点以下は切り捨て)： (16 × 基本攻撃速度) × (100 / (100 + 速度オプション))
            <Divider />
            <div style={{ marginTop: '10px' }}>
              ※2014/06/17アップデートから、無条件で基本攻撃速度に 20% の攻撃速度が加算がされています
              <br />
              ※2018/01時点の仕様をベースに作成。2018年以降の仕様には未対応となります
            </div>
          </Typography>
        </Container>
      </Layout>
    </>
  );
};

export default Calculator;
