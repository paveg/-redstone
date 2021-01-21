import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import Layout from '../components/Layout';
import { Container } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import EasyAttackSpeed from '../components/calculators/EasyAttackSpeed';
import AttackSpeed from '../components/calculators/AttackSpeed';

const Calculator: React.FC = () => {
  return (
    <>
      <Layout>
        <Container>
          <Box component="div" mb={2}>
            <Typography variant="h4" align="center">
              攻撃速度計算機
            </Typography>
            <Typography variant="subtitle1" align="center">
              ※2018/01時点の仕様をベースに作成。2018年以降の仕様には未対応となります。
            </Typography>
          </Box>
          <EasyAttackSpeed />
          <AttackSpeed />

          <Typography variant="caption" align="center">
            RedStoneでは1秒 = 16フレーム
            <br />
            計算式（小数点以下は切り捨て)： (16 × 基本攻撃速度) × (100 / (100 + 速度オプション))
          </Typography>
        </Container>
      </Layout>
    </>
  );
};

export default Calculator;
