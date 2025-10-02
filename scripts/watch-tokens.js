#!/usr/bin/env node

import { execSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import chokidar from 'chokidar';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const globalCssPath = path.join(__dirname, '../packages/stylesheet/src/global.css');
const designTokenPath = path.join(__dirname, '../packages/design-token');

console.log('🔍 CSS 변수 감시를 시작합니다...');
console.log(`📁 감시 대상: ${globalCssPath}`);

// 파일 변경 감시
const watcher = chokidar.watch(globalCssPath, {
  persistent: true,
  ignoreInitial: false,
});

let isGenerating = false;

watcher.on('change', async (filePath) => {
  if (isGenerating) {
    console.log('⏭️  토큰 생성이 이미 진행 중입니다. 건너뜁니다.');
    return;
  }

  console.log(`📝 파일 변경 감지: ${path.basename(filePath)}`);

  try {
    isGenerating = true;
    console.log('🔄 토큰 자동 생성을 시작합니다...');

    // 토큰 생성 실행
    execSync('pnpm generate', {
      cwd: designTokenPath,
      stdio: 'inherit',
    });

    console.log('✅ 토큰 자동 생성이 완료되었습니다!');
  } catch (error) {
    console.error('❌ 토큰 생성 중 오류 발생:', error.message);
  } finally {
    isGenerating = false;
  }
});

watcher.on('ready', () => {
  console.log('🚀 감시 시스템이 준비되었습니다.');
  console.log('📝 global.css 파일을 수정하면 자동으로 토큰이 업데이트됩니다.');
});

// 종료 처리
process.on('SIGINT', () => {
  console.log('\n👋 감시를 종료합니다...');
  watcher.close();
  process.exit(0);
});

process.on('SIGTERM', () => {
  watcher.close();
  process.exit(0);
});
