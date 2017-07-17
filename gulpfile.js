'use strict';

const gulptraum = require('@process-engine-js/gulptraum');

const buildSystemConfig = {
};

const buildSystem = new gulptraum.BuildSystem(buildSystemConfig);

buildSystem.config = buildSystemConfig;

const typeScriptConfig = {
  compileToModules: ['commonjs', 'amd'],
};

const gulp = require('gulp');

buildSystem
  .registerPlugin('typescript', gulptraum.plugins.typescript, typeScriptConfig)
  .registerTasks(gulp);
