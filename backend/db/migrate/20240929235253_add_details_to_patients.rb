class AddDetailsToPatients < ActiveRecord::Migration[7.2]
  def change
    add_column :patients, :dni, :string
    add_column :patients, :phone, :string
    add_column :patients, :address, :string
    add_column :patients, :email, :string
    add_column :patients, :gender, :string
    add_column :patients, :city, :string
    add_column :patients, :country, :string
    add_index :patients, :dni, unique: true
    add_index :patients, :email, unique: true
  end
end
