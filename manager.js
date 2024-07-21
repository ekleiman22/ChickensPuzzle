function moveFarmers() {        
    /*get all players positions
     * /and define new man,woman positions
     * Rules for man:
     * Let its postion is (i,j)
     * 1.If distance from hen is equal to 1
     * then catch it and return
     * 2.If woman position is (i,j+1)
     *  then next man position is (i+1,j)
     *  if i<5 otherwise it is (i-1,j)
     * 3.If hen position is (m, n)  where
     *   n-j>=2 then next man position is
     *   (i,j+1)
     * Rules for woman
     * Let its postion is (i,j)
     * 1.If distance from rooster is equal to 1
     * then catch it and return
     * 2.If rooster position is (m, n)  where
     *   j-n>=2 then next woman position is
     *   (i,j-1)
     */
    processGameStart()
    
    if (manCell != null) {

        moveman();
        advanceFigureIndex();
    }
    if (womanCell != null) {
        setTimeout(movewoman,1000);        
    }
    
}
function moveman() {
    if (checkHenCatch())
    {
        henCatched = true;
        document.getElementById("txtMessage").value =
            messages[6]; // "Hen Catched!";
        manCell.innerHTML = "";
        henCell.innerHTML = "";
        manCell = null;
        henCell = null;
        return;
    }
    let [i, j] = [parseInt(manCell.dataset.row),
        parseInt(manCell.dataset.col)];
    let [iw, jw] = [0, 0];
    if (womanCell != null) {
        [iw, jw] = [parseInt(womanCell.dataset.row),
        parseInt(womanCell.dataset.col)];
    }
    let [m, n] = [parseInt(henCell.dataset.row),
                  parseInt(henCell.dataset.col)];
    if (jw == j + 1) {
        if (i < 5)
            manCell = cellsarr[i + 1][j];
        else
            manCell = cellsarr[i - 1][j];
    }
    else
        if (n - j >= 2) {
            manCell = cellsarr[i][j + 1];
        }
        else {
            if (m - i >= 2)
                manCell = cellsarr[i + 1][j];
            else
                manCell = cellsarr[i -1][j];
        }
    cellsarr[i][j].innerHTML = "";
    manCell.innerHTML = figures[0].symbol;

}

function movewoman() {
    let [i, j] = [parseInt(womanCell.dataset.row),
    parseInt(womanCell.dataset.col)];
    if (checkRoosterCatch()) {
        roosterCatched = true;
        document.getElementById("txtMessage").value =
            messages[7];
        womanCell.innerHTML = "";
        roosterCell.innerHTML = "";
        womanCell = null;
        roosterCell = null;
    }
    else {
        

        let [m, n] = [parseInt(roosterCell.dataset.row),
        parseInt(roosterCell.dataset.col)];

        if (j - n >= 2) {
            womanCell = cellsarr[i][j - 1];
        }
        else {
            if (m - i >= 2)
                womanCell = cellsarr[i + 1][j];
            else
                womanCell = cellsarr[i - 1][j];
        }
        cellsarr[i][j].innerHTML = "";
        womanCell.innerHTML = figures[1].symbol;
    }    
    advanceFigureIndex();
}