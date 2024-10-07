class Biography < ApplicationRecord
  belongs_to :patient
  validates :patient_id, uniqueness: true
end
