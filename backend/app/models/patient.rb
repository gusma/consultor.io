class Patient < ApplicationRecord
    validates :dni, presence: true, uniqueness: true
    validates :email, presence: true, uniqueness: true, format: { with: URI::MailTo::EMAIL_REGEXP }
    validates :gender, inclusion: { in: %w(male female other), message: "%{value} is not a valid gender" }
    
    # Add any other validations or associations as needed
  end