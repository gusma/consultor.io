class CreateBiographies < ActiveRecord::Migration[6.1]
  def change
    create_table :biographies do |t|
      t.text :content
      t.references :patient, null: false, foreign_key: true, index: { unique: true }

      t.timestamps
    end
  end
end