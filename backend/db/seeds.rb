# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


Post.create!([
    {
        image: "写真1", 
        place: "佐久島",
        genre: "ドライブ",
        city: "愛知"
    },
    {
        image: "写真2",
        place: "下呂温泉",
        genre: "温泉",
        city: "岐阜"
    },
    {
        image: "写真3",
        place: "地中海村",
        genre: "デート",
        city: "三重"
    }
])
