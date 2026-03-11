# Clear existing data
puts "Clearing existing data..."
Expense.destroy_all
Category.destroy_all

# Create categories
puts "Creating categories..."
categories = [
  'Food',
  'Transportation',
  'Shopping',
  'Entertainment',
  'Bills',
  'Healthcare',
  'Education',
  'Travel',
  'Personal',
  'Other'
]

created_categories = categories.map do |cat_name|
  Category.create!(name: cat_name)
end

puts "Created #{created_categories.count} categories"

payer_names = [
    'John Doe',
    'Jane Smith',
    'Mike Johnson',
    'Sarah Lee',
    'John Doe',
    'Emily Chen',
    'Mike Johnson',
    'Jane Smith',
    'Sarah Lee',
    'Emily Chen',
    'John Doe',
    'Mike Johnson',
    'Jane Smith',
    'Sarah Lee',
    'Emily Chen'
]

# Define expense templates for variety
expense_templates = {
  'Food' => [
    { description: 'Grocery shopping', amount_range: 50..150 },
    { description: 'Restaurant dinner', amount_range: 30..80 },
    { description: 'Coffee shop', amount_range: 5..15 },
    { description: 'Fast food lunch', amount_range: 8..20 },
    { description: 'Delivery food', amount_range: 15..40 },
    { description: 'Bakery items', amount_range: 10..25 }
  ],
  'Transportation' => [
    { description: 'Gas fill-up', amount_range: 40..70 },
    { description: 'Uber/Lyft ride', amount_range: 15..35 },
    { description: 'Public transit pass', amount_range: 50..100 },
    { description: 'Parking fee', amount_range: 5..20 },
    { description: 'Car maintenance', amount_range: 100..300 },
    { description: 'Toll fees', amount_range: 5..15 }
  ],
  'Shopping' => [
    { description: 'Clothing purchase', amount_range: 40..150 },
    { description: 'Electronics', amount_range: 100..500 },
    { description: 'Home goods', amount_range: 30..120 },
    { description: 'Books', amount_range: 15..50 },
    { description: 'Beauty products', amount_range: 20..80 },
    { description: 'Online shopping', amount_range: 25..100 }
  ],
  'Entertainment' => [
    { description: 'Movie tickets', amount_range: 15..40 },
    { description: 'Streaming subscription', amount_range: 10..20 },
    { description: 'Concert tickets', amount_range: 50..150 },
    { description: 'Gaming purchase', amount_range: 20..60 },
    { description: 'Sports event', amount_range: 30..100 },
    { description: 'Museum entry', amount_range: 15..30 }
  ],
  'Bills' => [
    { description: 'Electricity bill', amount_range: 80..150 },
    { description: 'Water bill', amount_range: 30..60 },
    { description: 'Internet service', amount_range: 50..100 },
    { description: 'Mobile phone bill', amount_range: 40..80 },
    { description: 'Home insurance', amount_range: 100..200 },
    { description: 'Rent payment', amount_range: 800..1500 }
  ],
  'Healthcare' => [
    { description: 'Doctor visit', amount_range: 50..150 },
    { description: 'Prescription medication', amount_range: 20..80 },
    { description: 'Dental checkup', amount_range: 80..200 },
    { description: 'Health insurance', amount_range: 200..400 },
    { description: 'Gym membership', amount_range: 40..80 },
    { description: 'Medical supplies', amount_range: 15..50 }
  ],
  'Education' => [
    { description: 'Online course', amount_range: 30..150 },
    { description: 'Textbooks', amount_range: 50..200 },
    { description: 'School supplies', amount_range: 20..60 },
    { description: 'Tutoring session', amount_range: 40..100 },
    { description: 'Workshop fee', amount_range: 50..150 },
    { description: 'Certification exam', amount_range: 100..300 }
  ],
  'Travel' => [
    { description: 'Flight tickets', amount_range: 200..800 },
    { description: 'Hotel booking', amount_range: 100..400 },
    { description: 'Travel insurance', amount_range: 50..150 },
    { description: 'Luggage', amount_range: 50..200 },
    { description: 'Tour package', amount_range: 150..500 },
    { description: 'Visa application', amount_range: 50..200 }
  ],
  'Personal' => [
    { description: 'Haircut', amount_range: 20..60 },
    { description: 'Spa treatment', amount_range: 50..150 },
    { description: 'Personal care items', amount_range: 15..50 },
    { description: 'Gift purchase', amount_range: 30..100 },
    { description: 'Charity donation', amount_range: 20..100 },
    { description: 'Pet care', amount_range: 30..100 }
  ],
  'Other' => [
    { description: 'Miscellaneous expense', amount_range: 10..100 },
    { description: 'Bank fees', amount_range: 5..30 },
    { description: 'Subscription service', amount_range: 10..50 },
    { description: 'Repairs', amount_range: 50..200 },
    { description: 'Storage rental', amount_range: 50..150 },
    { description: 'Professional services', amount_range: 100..300 }
  ]
}

# Start date: January 1, 2024
# End date: February 18, 2026
start_date = Date.new(2024, 1, 1)
end_date = Date.new(2026, 2, 18)

expenses_to_insert = []
current_date = start_date

while current_date <= end_date
  rand(3..8).times do
    category = created_categories.sample
    templates = expense_templates[category.name]
    next unless templates

    template = templates.sample
    amount = rand(template[:amount_range]).to_f + rand(0..99)/100.0

    # Random time during the day
    random_time = Time.zone.local(
      current_date.year,
      current_date.month,
      current_date.day,
      rand(0..23),
      rand(0..59),
      rand(0..59)
    )

    expenses_to_insert << {
      description: template[:description],
      amount: amount,
      category_id: category.id,
      expense_date: random_time,
      created_at: random_time,
      updated_at: random_time,
      payer_name: payer_names.sample
    }
  end
  current_date += 1.day
end

puts "Inserting #{expenses_to_insert.size} expenses..."
Expense.insert_all(expenses_to_insert)

puts "Seed data created successfully!"
puts "Total categories: #{Category.count}"
puts "Total expenses: #{Expense.count}"
puts "Date range: #{Expense.minimum(:expense_date)} to #{Expense.maximum(:expense_date)}"
puts "Total amount: $#{Expense.sum(:amount).round(2)}"