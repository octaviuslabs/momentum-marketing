require "spec_helper"
require "support/env_vars"
require "selenium/webdriver"

sauce_endpoint = EnvVars.sauce_endpoint

desktop_operating_systems = ["Windows 7", "Windows 8.1", "OS X 10.11", "OS X 10.10", "OS X 10.9", "Windows XP"]
mobile_operating_systems = ["Android 4", "iOS 8"]
ios_devices = ["iPhone 6 Plus", 'iPhone 6', 'iPhone 5s', 'iPhone 5']


chrome_versions = [44, 43, 36]
fire_fox_versions = [40, 39]
safari_versions = [8, 7]
ie_versions = [11, 9]

def time_stamp
  @time_stamp ||= Time.now
end

def browser_versions_hash browser_name, version
  version = version.to_s
  browser_name = browser_name.to_s
  {
    browserName: browser_name,
    version: version
  }
end

def chrome_hash version=chrome_versions.first
  browser_versions_hash("Chrome", version)
end

def firefox_hash version=fire_fox_versions.first
  browser_versions_hash("Firefox", version)
end

def ie_hash version=ie_versions.first
  browser_versions_hash("Internet Explorer", version)
end

def base_hash os, name="Vesper Marketing Test"
  {
    platform: os,
    name: %[#{name} #{time_stamp.to_s}]
  }
end

def ios_hash device=ios_devices.first, orient="portrait"
  {
    platform: 'OS X 10.10',
    version: '9.0',
    deviceName: device,
    deviceOrientation: orient
  }
end

def android_hash device='Android Emulator', orient="portrait"
  {
    platform: 'Linux',
    version: '4.0',
    deviceName: device,
    deviceOrientation: orient
  }
end

environments = Array.new

# Desktops
chrome_versions.each do |version|
  desktop_operating_systems.each do |os|
    environments << base_hash(os).merge(chrome_hash(version))
  end
end

fire_fox_versions.each do |version|
  desktop_operating_systems.each do |os|
    environments << base_hash(os).merge(firefox_hash(version))
  end
end

ie_versions.each do |version|
  desktop_operating_systems.each do |os|
    environments << base_hash(os).merge(ie_hash(version))
  end
end


# mobile_operating_systems
ios_devices.each do |devise|
  environments << ios_hash(devise, "portrait")
  environments << ios_hash(devise, "landscape")
end

environments << android_hash('Android Emulator', "portrait")
environments << android_hash('Android Emulator', "landscape")

class CantFindPage < StandardError; end

environments.each do |environment|
  begin
    driver = Selenium::WebDriver.for :remote, :url => sauce_endpoint, :desired_capabilities => environment
    driver.manage.timeouts.implicit_wait = 10
    driver.navigate.to EnvVars.stage_url

    raise CantFindPage, "Unable to load Vesper." unless driver.title.include? "Vesper"
    print %[Ran #{environment.to_s}\n]
    driver.quit
  rescue Selenium::WebDriver::Error::WebDriverError => e
    print %[Error on #{environment.to_s} #{ e }\n]
  rescue CantFindPage => e
    print %[Error on #{environment.to_s} #{ e }\n]
  end
end
