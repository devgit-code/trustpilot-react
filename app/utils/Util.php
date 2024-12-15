// utils/Util.php
namespace App\Utils;

class Util {
    // A static method to convert a string to uppercase
    public static function toUpperCase($input) {
        return strtoupper($input);
    }

    // Another static method for other utilities, e.g., capitalize first letter
    public static function capitalizeFirstLetter($input) {
        return ucfirst($input);
    }

    // You can add more utility methods here as needed
}
