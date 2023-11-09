-- CreateTable
CREATE TABLE "accounts" (
    "account_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "car_plate" TEXT NOT NULL,
    "is_passenger" BOOLEAN NOT NULL,
    "is_driver" BOOLEAN NOT NULL,
    "password" TEXT NOT NULL,
    "password_algorithm" TEXT NOT NULL,
    "salt" TEXT NOT NULL,

    CONSTRAINT "accounts_pkey" PRIMARY KEY ("account_id")
);

-- CreateTable
CREATE TABLE "rides" (
    "ride_id" TEXT NOT NULL,
    "passenger_id" TEXT NOT NULL,
    "driver_id" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "fare" DECIMAL(65,30) NOT NULL,
    "distance" DECIMAL(65,30) NOT NULL,
    "from_lat" DECIMAL(65,30) NOT NULL,
    "from_long" DECIMAL(65,30) NOT NULL,
    "to_lat" DECIMAL(65,30) NOT NULL,
    "to_long" DECIMAL(65,30) NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "rides_pkey" PRIMARY KEY ("ride_id")
);

-- CreateTable
CREATE TABLE "positions" (
    "position_id" TEXT NOT NULL,
    "lat" DECIMAL(65,30) NOT NULL,
    "long" DECIMAL(65,30) NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "rideRide_id" TEXT NOT NULL,

    CONSTRAINT "positions_pkey" PRIMARY KEY ("position_id")
);

-- AddForeignKey
ALTER TABLE "rides" ADD CONSTRAINT "rides_passenger_id_fkey" FOREIGN KEY ("passenger_id") REFERENCES "accounts"("account_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rides" ADD CONSTRAINT "rides_driver_id_fkey" FOREIGN KEY ("driver_id") REFERENCES "accounts"("account_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "positions" ADD CONSTRAINT "positions_rideRide_id_fkey" FOREIGN KEY ("rideRide_id") REFERENCES "rides"("ride_id") ON DELETE RESTRICT ON UPDATE CASCADE;
