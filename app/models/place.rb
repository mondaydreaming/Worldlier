class Place < ActiveRecord::Base
  has_and_belongs_to_many :trips
  has_many :notes

  geocoded_by :address
  after_validation :geocode 
end
