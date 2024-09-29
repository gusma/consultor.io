class CreateEntries < ActiveRecord::Migration[7.2]
  def change
    create_table :entries do |t|
      t.text :content
      t.references :patient, null: false, foreign_key: true

      t.timestamps
    end
  end
end
