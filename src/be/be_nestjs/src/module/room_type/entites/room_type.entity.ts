import { Hotel } from "@/module/hotel/entities/hotel.entity";
import { Room } from "@/module/room/entities/room.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "room_type" })
export class RoomType {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    type: number;

    @Column()
    price: number;

    @Column()
    weekendPrice: number;

    @Column()
    flexiblePrice: number;

    @ManyToOne(() => Hotel, (hotel) => hotel.roomTypes, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'hotelId' })
    hotel: Hotel;

    @Column({ nullable: true })
    nums: number;

    // Quan hệ một-nhiều với Room (một loại phòng có thể có nhiều phòng)
    @OneToMany(() => Room, (room) => room.roomType)
    rooms: Room[];
}
