export default function formatCurrency(amount: number): string{
    let a = Number(amount);
    if(isNaN(a)){
        a = 0;
    }
    const string = new Intl.NumberFormat("en-CO", {
        style: "decimal",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(a).replace(/,/g, '.');;

    return '$ ' + string;
}