<?php

return array(
  '*' => array(
    'omitScriptNameInUrls' => true,
    'limitAutoSlugsToAscii' => true,
  ),

  'craft.dev' => array(
    'devMode' => true,
    'environment' => 'local',
    'siteUrl' => 'http://tmp-www.craft.dev'
  ),

  'staging.themodernproper.com' => array(
    'siteUrl' => 'http://staging.themodernproper.com',
    'devMode' => true,
    'environmentVariables' => array(
      'baseUrl'  => 'http://staging.themodernproper.com'
    ),
  ),

  'themodernproper.com' => array(
    'siteUrl' => 'https://themodernproper.com',
    'devMode' => false,
    'environmentVariables' => array(
      'baseUrl'  => 'https://themodernproper.com'
    ),
  ),
);
