<?php
    require_once '../Controller/dbExec.php';
	require_once ('Classes/PHPExcel.php');
	
    //echo $_GET['id'];
    $query="CALL sp_reporte1('".$_GET['id']."');";
    //echo $query;
    $msg=dbExec::exec($query);//clase read QueryExe
    #echo $msg;
    $js= json_decode($msg);
    $report=$js->repor;
    $sitio=$js->sitio;

    $familias= array();
    foreach ($report as &$vl1) {
        $mrc=$vl1->tipo;            
        $ok=true;
        foreach ($familias as &$vl2) {
            if($vl2==$mrc){
                $ok=false;
            }
        }
        if($ok){
           array_push($familias,$mrc);
        }                                        
    }
    asort($familias);

    $vec = array();
    foreach ($familias as &$vl3){
        $semi = array();
        foreach($report as &$vl4){
            if($vl4->tipo==$vl3){
                if($vl4->cant01>0){
                    array_push($semi,$vl4);         
                }
            }
        }
        usort($semi, function($a, $b){
            return strcmp($a->descr, $b->descr);
        }); 

        foreach($semi as &$vl5){
            array_push($vec,$vl5);     
        }    
    }

    $limt=count($vec);
    //$limt=0;
    //echo $limt;
    // Crea un nuevo objeto PHPExcel
    $objPHPExcel = new PHPExcel();

     $estilo = array(
        'font'  => array(
            'bold'  => true,
            'size'  => 12,
            'name'  => 'Arial Narrow',
            'color' => array('rgb' => 'FFFFFF')
        ));

    
    $objPHPExcel->getDefaultStyle()->getFont()->setName('Arial');
    $objPHPExcel->getDefaultStyle()->getFont()->setSize(10);

    $objPHPExcel->getDefaultStyle()->getAlignment()->setWrapText(true);  

     $ini=1;    
    $objPHPExcel->getActiveSheet()->getColumnDimension('B')->setWidth(24);
    $objPHPExcel->getActiveSheet()->getColumnDimension('C')->setWidth(62);
    $objPHPExcel->getActiveSheet()->getColumnDimension('F')->setWidth(28);
    //$objPHPExcel->getActiveSheet()->getColumnDimension('G')->setWidth(18);
    /*
    $objPHPExcel->getActiveSheet()->mergeCells('B'.$ini.':J'.$ini);
    $objPHPExcel->getActiveSheet()->mergeCells('M'.$ini.':N'.$ini);
    $objPHPExcel->getActiveSheet()->mergeCells('O'.$ini.':P'.$ini);
    */
    $objPHPExcel->getActiveSheet()->getStyle('A'.$ini)->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
    $objPHPExcel->getActiveSheet()->getStyle('B'.$ini)->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);

    $objPHPExcel->getActiveSheet()->getStyle('C'.$ini)->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
    $objPHPExcel->getActiveSheet()->getStyle('D'.$ini)->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
    $objPHPExcel->getActiveSheet()->getStyle('E'.$ini)->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
    $objPHPExcel->getActiveSheet()->getStyle('F'.$ini)->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);

    //$objPHPExcel->getActiveSheet()->getStyle('G'.$ini)->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);

    $objPHPExcel->getActiveSheet()->getStyle('A'.$ini)->applyFromArray($estilo);
    $objPHPExcel->getActiveSheet()->getStyle('A'.$ini)->applyFromArray(
        array(
            'fill' => array(
                'type' => PHPExcel_Style_Fill::FILL_SOLID,
                'color' => array('rgb' => '0070C0')
            )
        )
    );
    $objPHPExcel->getActiveSheet()->getStyle('B'.$ini)->applyFromArray($estilo);
    $objPHPExcel->getActiveSheet()->getStyle('B'.$ini)->applyFromArray(
        array(
            'fill' => array(
                'type' => PHPExcel_Style_Fill::FILL_SOLID,
                'color' => array('rgb' => '0070C0')
            )
        )
    );
    $objPHPExcel->getActiveSheet()->getStyle('C'.$ini)->applyFromArray($estilo);
    $objPHPExcel->getActiveSheet()->getStyle('C'.$ini)->applyFromArray(
        array(
            'fill' => array(
                'type' => PHPExcel_Style_Fill::FILL_SOLID,
                'color' => array('rgb' => '0070C0')
            )
        )
    );
    $objPHPExcel->getActiveSheet()->getStyle('D'.$ini)->applyFromArray($estilo);
    $objPHPExcel->getActiveSheet()->getStyle('D'.$ini)->applyFromArray(
        array(
            'fill' => array(
                'type' => PHPExcel_Style_Fill::FILL_SOLID,
                'color' => array('rgb' => '0070C0')
            )
        )
    );
    $objPHPExcel->getActiveSheet()->getStyle('E'.$ini)->applyFromArray($estilo);
    $objPHPExcel->getActiveSheet()->getStyle('E'.$ini)->applyFromArray(
        array(
            'fill' => array(
                'type' => PHPExcel_Style_Fill::FILL_SOLID,
                'color' => array('rgb' => '0070C0')
            )
        )
    );
    $objPHPExcel->getActiveSheet()->getStyle('F'.$ini)->applyFromArray($estilo);
    $objPHPExcel->getActiveSheet()->getStyle('F'.$ini)->applyFromArray(
        array(
            'fill' => array(
                'type' => PHPExcel_Style_Fill::FILL_SOLID,
                'color' => array('rgb' => '0070C0')
            )
        )
    );
    /*
    $objPHPExcel->getActiveSheet()->getStyle('G'.$ini)->applyFromArray($estilo);
    $objPHPExcel->getActiveSheet()->getStyle('G'.$ini)->applyFromArray(
        array(
            'fill' => array(
                'type' => PHPExcel_Style_Fill::FILL_SOLID,
                'color' => array('rgb' => '0070C0')
            )
        )
    );
    */
    $objPHPExcel->getActiveSheet()->setCellValue('A'.$ini,'#');
    $objPHPExcel->getActiveSheet()->setCellValue('B'.$ini,'Familia');
    $objPHPExcel->getActiveSheet()->setCellValue('C'.$ini,'Articulo');
    $objPHPExcel->getActiveSheet()->setCellValue('D'.$ini,'Cant.');
    $objPHPExcel->getActiveSheet()->setCellValue('E'.$ini,'Uni');
    $objPHPExcel->getActiveSheet()->setCellValue('F'.$ini,'Marca');
    //$objPHPExcel->getActiveSheet()->setCellValue('G'.$ini,'Modelo');


    $ini=$ini+1;
    $fam_a='';

    for ($d=0; $d<$limt; $d++) {    
        $obj=$vec[$d];

        $objPHPExcel->getActiveSheet()->getStyle('A'.($ini+$d))->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
        $objPHPExcel->getActiveSheet()->getStyle('B'.($ini+$d))->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);

        $objPHPExcel->getActiveSheet()->getStyle('D'.($ini+$d))->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
        $objPHPExcel->getActiveSheet()->getStyle('E'.($ini+$d))->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
        $objPHPExcel->getActiveSheet()->getStyle('F'.($ini+$d))->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
        

        $objPHPExcel->getActiveSheet()->setCellValue('A'.($ini+$d),''.($d+1));
        //if($fam_a!=$obj->tipo){
            $objPHPExcel->getActiveSheet()->setCellValue('B'.($ini+$d),''.$obj->tipo);
        //}
        $fam_a=$obj->tipo;
        $objPHPExcel->getActiveSheet()->setCellValue('C'.($ini+$d),'('.$obj->id_art.') '.$obj->descr);
        $objPHPExcel->getActiveSheet()->setCellValue('D'.($ini+$d),''.$obj->cant01);
        $objPHPExcel->getActiveSheet()->setCellValue('E'.($ini+$d),'pz');
        $objPHPExcel->getActiveSheet()->setCellValue('F'.($ini+$d),''.$obj->marca);
    }

    // Nombramos la hoja
    $objPHPExcel->getActiveSheet()->setTitle($sitio);
    $objPHPExcel->getActiveSheet()->getPageSetup()->setOrientation(PHPExcel_Worksheet_PageSetup::ORIENTATION_LANDSCAPE); 
    /*
    $objPHPExcel->getActiveSheet()->getPageSetup()->setPaperSize(PHPExcel_Worksheet_PageSetup::PAPERSIZE_A4); 
    //PARA EL TIPO DE HOJA PARA LA IMPRESIÓN
    */
    $objPHPExcel->getActiveSheet()->getPageMargins()->setTop(0.1); 
    $objPHPExcel->getActiveSheet()->getPageMargins()->setRight(0.05); 
    $objPHPExcel->getActiveSheet()->getPageMargins()->setLeft(0.05); 
    $objPHPExcel->getActiveSheet()->getPageMargins()->setBottom(0.1); 


    // Elegimos en que hoja se abre el Excel
    $objPHPExcel->setActiveSheetIndex(0);

    // indicar que se envia un archivo de Excel.
    header('Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    header('Content-Disposition: attachment;filename="reporte_omega_'.$sitio.'.xlsx"');
    header('Cache-Control: max-age=0');

    $objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel2007');
    $objWriter->save('php://output');
    
    
    exit;


    
?>

