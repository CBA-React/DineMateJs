import { Star } from "lucide-react";

export const RestaurantBadge = ({label, value, icon}) => {
    const Icon = icon;
    
    if (typeof value === "boolean") {
        const style = value ? "text-approve" : "text-accent";
        return (
          <div className="flex flex-col gap-0.5 bg-white rounded-[10px] p-5 min-w-[250px]">
            <p className="text-sm text-primary-text uppercase">{label}</p>
            <span className={`flex items-center gap-2 ${style}`}>
              <Icon className="w-8 h-8" />
              {value ? "Open" : "Closed"}
            </span>
          </div>
        );
      }
    
      return (
        <div className="flex flex-col gap-0.5 bg-white rounded-[10px] p-5 min-w-[250px]">
          <p className="text-sm text-primary-text uppercase">{label}</p>
          <span className="flex items-center gap-2">
            <Icon fill={icon === Star ? "currentColor" : "none"} className="w-8 h-8 text-accent" />
            <span className="text-primary-text">{value}</span>
          </span>
        </div>
      );
}