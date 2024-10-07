class Patient < ApplicationRecord
    validates :first_name, presence: true
    validates :last_name, presence: true
    validates :dni, presence: true, uniqueness: true
    validates :phone, presence: true
    validates :address, presence: true
    validates :email, presence: true
    has_one :biography, dependent: :destroy
end