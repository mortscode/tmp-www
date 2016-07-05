<?php

return array(
  '*' => array(
    'omitScriptNameInUrls' => true,
    'limitAutoSlugsToAscii' => true,
  ),

  '.dev' => array(
    'devMode' => true,
    'siteUrl' => 'http://tmp-www.craft.dev',
    'environmentVariables' => array(
      'baseUrl'  => 'http://tmp-www.craft.dev'
    ),
  ),

  'staging.themodernproper.com' => array(
    'siteUrl' => 'https://staging.themodernproper.com',
    'devMode' => true,
    'environmentVariables' => array(
      'basePath' => $_SERVER['DOCUMENT_ROOT'] . '/',
      'baseUrl'  => 'https://staging.themodernproper.com'
    ),
  ),

  'themodernproper.com' => array(
    'siteUrl' => 'https://themodernproper.com',
    'devMode' => false,
    'environmentVariables' => array(
      'basePath' => $_SERVER['DOCUMENT_ROOT'] . '/',
      'baseUrl'  => 'https://themodernproper.com'
    ),
  ),
);
